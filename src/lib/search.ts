import { embedQuery } from '@/lib/embeddings';
import { getServerClient } from '@/lib/supabase';
import type { SearchResult } from '@/types/search';

/**
 * Server-side semantic search over the conditions corpus.
 *
 * Kept separate from the route handler so the retrieval logic has one home and
 * can be reused (a future /api/chat, a sitemap-style related-conditions build
 * step) without going back through HTTP.
 */

/** How many results to return when the caller doesn't say. */
export const DEFAULT_MATCH_COUNT = 12;

/**
 * Cosine-similarity floor, below which a hit is treated as noise.
 *
 * Vector search always returns *something* — its nearest neighbours exist even
 * for gibberish. Without a floor, searching "asdfgh" confidently returns twelve
 * unrelated conditions, which reads as broken. 0.15 is deliberately permissive:
 * short queries embedded against long documents score lower than intuition
 * suggests, so a high threshold silently kills good results. Tune it after
 * watching real queries, not before.
 */
export const MIN_SIMILARITY = 0.15;

/** Shape of a single row returned by the match_conditions RPC. */
type MatchRow = {
  slug: string;
  similarity: number;
};

export type SearchConditionsArgs = {
  query: string;
  category?: string;
  limit?: number;
};

/**
 * Embeds the query and returns matching condition slugs, best first.
 *
 * Throws if OpenAI or Supabase is unreachable — callers decide whether that's
 * fatal or a cue to fall back to name matching.
 */
export async function searchConditions({
  query,
  category,
  limit = DEFAULT_MATCH_COUNT,
}: SearchConditionsArgs): Promise<SearchResult[]> {
  const embedding = await embedQuery(query);

  const { data, error } = await getServerClient().rpc('match_conditions', {
    query_embedding: embedding,
    match_count: limit,
    // Explicit null rather than undefined: supabase-js omits undefined keys
    // from the payload, which would leave the SQL default in place. Here they
    // happen to agree, but relying on that is the kind of thing that breaks
    // quietly when a default changes.
    filter_category: category ?? null,
    min_similarity: MIN_SIMILARITY,
  });

  if (error) {
    throw new Error(`Supabase search failed: ${error.message}`);
  }

  const rows = (data ?? []) as MatchRow[];

  return rows.map((row) => ({
    slug: row.slug,
    similarity: row.similarity,
  }));
}
