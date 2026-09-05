import OpenAI from 'openai';

/**
 * Embedding model used for BOTH the ingest script and live queries.
 *
 * These must never diverge: vectors produced by different models are not
 * comparable, and a mismatch fails silently as nonsense results rather than as
 * an error. Importing this constant in both places is what keeps them in sync.
 *
 * text-embedding-3-small → 1536 dimensions, ~$0.02 per 1M tokens.
 */
export const EMBEDDING_MODEL = 'text-embedding-3-small';

/** Must match the `vector(N)` dimension in scripts/sql/001_search.sql. */
export const EMBEDDING_DIMENSIONS = 1536;

let client: OpenAI | null = null;

/**
 * Lazily constructs the OpenAI client so that importing this module doesn't
 * throw at build time when the key is absent.
 */
function getClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set.');
  }
  client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

/** True when live embedding is possible. Used to decide fallback behaviour. */
export function isEmbeddingConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

/**
 * Cache of query text → embedding vector.
 *
 * Search runs on every debounced keystroke, so the same prefixes recur
 * constantly both within one session and across users ("adhd", "joint pain").
 * Caching turns those into free, instant lookups.
 *
 * Deliberately process-local and bounded: it lives as long as the serverless
 * instance does and no longer. A shared cache (Redis/KV) would be the move if
 * this ever needs to survive cold starts, but for an ~69-row corpus the win
 * here is already most of what's available.
 */
const CACHE_LIMIT = 500;
const cache = new Map<string, number[]>();

function normalizeQuery(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function readCache(key: string): number[] | undefined {
  const hit = cache.get(key);
  if (!hit) return undefined;
  // Re-insert so the most recently used entry is last, making the eviction
  // below an LRU rather than a plain FIFO.
  cache.delete(key);
  cache.set(key, hit);
  return hit;
}

function writeCache(key: string, value: number[]): void {
  cache.set(key, value);
  if (cache.size > CACHE_LIMIT) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

/**
 * Turns a user's search query into an embedding vector, memoized on the
 * normalized query text.
 */
export async function embedQuery(text: string): Promise<number[]> {
  const key = normalizeQuery(text);

  const cached = readCache(key);
  if (cached) return cached;

  const response = await getClient().embeddings.create({
    model: EMBEDDING_MODEL,
    input: key,
  });

  const embedding = response.data[0]?.embedding;
  if (!embedding) {
    throw new Error('OpenAI returned no embedding for the query.');
  }

  writeCache(key, embedding);
  return embedding;
}
