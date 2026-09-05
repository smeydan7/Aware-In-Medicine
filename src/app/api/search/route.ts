import { NextResponse } from 'next/server';
import { features } from '@/config/features';
import { searchSchema } from '@/lib/validation';
import { searchConditions } from '@/lib/search';
import { isEmbeddingConfigured } from '@/lib/embeddings';
import { isSupabaseConfigured } from '@/lib/supabase';
import { clientKeyFromRequest, rateLimit } from '@/lib/rate-limit';
import type { SearchErrorCode } from '@/types/search';

/**
 * POST /api/search
 *
 * Semantic search over the Conditions Library.
 *
 * Body:  { query: string, category?: string, limit?: number }
 * 200:   { results: [{ slug, similarity }] }   — ranked, best first
 * 400:   { error, code: 'invalid_request' }
 * 429:   { error, code: 'rate_limited' }
 * 503:   { error, code: 'not_configured' }     — client should fall back
 * 502:   { error, code: 'upstream_error' }     — client should fall back
 *
 * The client is expected to degrade to plain name matching on 503 and 502
 * rather than showing an error. A dead search box is worse than a dumb one.
 */

// The OpenAI SDK needs the Node runtime, not Edge.
export const runtime = 'nodejs';

/** 30 searches/minute/IP — far above human typing speed with a 350ms debounce. */
const RATE_LIMIT = { limit: 30, windowMs: 60_000 };

function fail(status: number, code: SearchErrorCode, error: string, headers?: HeadersInit) {
  return NextResponse.json({ error, code }, { status, headers });
}

export async function POST(req: Request) {
  if (!features.semanticSearch.enabled) {
    return fail(503, 'not_configured', 'Semantic search is disabled.');
  }

  // Checked before doing any work so a half-configured environment produces a
  // clean fallback signal instead of a 500 from deep inside the SDK.
  if (!isEmbeddingConfigured() || !isSupabaseConfigured()) {
    return fail(
      503,
      'not_configured',
      'Semantic search is not configured on this server.'
    );
  }

  const { allowed, retryAfter } = rateLimit(
    clientKeyFromRequest(req),
    RATE_LIMIT
  );
  if (!allowed) {
    return fail(429, 'rate_limited', 'Too many searches. Please slow down.', {
      'Retry-After': String(retryAfter),
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, 'invalid_request', 'Invalid JSON body.');
  }

  const parsed = searchSchema.safeParse(body);
  if (!parsed.success) {
    return fail(
      400,
      'invalid_request',
      parsed.error.issues[0]?.message ?? 'Invalid search request.'
    );
  }

  try {
    const results = await searchConditions(parsed.data);
    return NextResponse.json({ results });
  } catch (err) {
    // Logged server-side; the client is told only that search is unavailable,
    // so upstream error text can never leak into the UI.
    console.error('[api/search]', err);
    return fail(502, 'upstream_error', 'Search is temporarily unavailable.');
  }
}
