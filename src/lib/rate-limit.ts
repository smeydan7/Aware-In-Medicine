/**
 * Minimal in-process rate limiter.
 *
 * WHAT THIS IS FOR: search hits a paid embedding API on every request. A stuck
 * key-repeat, a broken client retry loop, or a bored visitor holding down a key
 * shouldn't be able to run up a bill. This stops that.
 *
 * WHAT THIS IS NOT: real abuse protection. State lives in the memory of one
 * serverless instance, so it resets on cold start and is tracked separately per
 * concurrent instance — a determined attacker just gets routed around it. If
 * this endpoint ever needs to withstand deliberate abuse, move the counter to
 * Vercel KV or Upstash Redis, where it can be shared. Until then, the honest
 * description is "a speed bump", and it's sized accordingly.
 */

type Bucket = {
  count: number;
  /** Epoch ms at which `count` resets to zero. */
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/** Stops the Map growing without bound on a long-lived instance. */
const MAX_TRACKED_KEYS = 10_000;

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets. Sent as Retry-After when blocked. */
  retryAfter: number;
};

export type RateLimitOptions = {
  /** Requests permitted per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    if (buckets.size >= MAX_TRACKED_KEYS) {
      // Cheap eviction: drop everything already expired. If nothing has
      // expired, the map is genuinely under load and clearing it is still
      // preferable to unbounded growth.
      for (const [k, bucket] of buckets) {
        if (now >= bucket.resetAt) buckets.delete(k);
      }
      if (buckets.size >= MAX_TRACKED_KEYS) buckets.clear();
    }

    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfter: 0 };
}

/**
 * Best-effort client identifier.
 *
 * Behind Vercel/most proxies `x-forwarded-for` is a comma-separated chain whose
 * first entry is the original client. It is trivially spoofable, which is fine
 * given what this limiter claims to do (see the module note above).
 */
export function clientKeyFromRequest(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
