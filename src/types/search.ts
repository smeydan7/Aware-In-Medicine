import type { ConditionCategory } from '@/types';

/**
 * A single semantic-search hit.
 *
 * Intentionally minimal: the client already holds the full condition list, so
 * the API returns identifiers and ranking only rather than shipping the same
 * condition data down a second time.
 */
export type SearchResult = {
  slug: string;
  /** Cosine similarity in [0, 1]. Higher is closer. */
  similarity: number;
};

export type SearchSuccessResponse = {
  results: SearchResult[];
};

/**
 * Machine-readable failure reasons, so the client can tell "you typed something
 * invalid" apart from "search isn't available, quietly fall back to name
 * matching" without parsing prose.
 */
export type SearchErrorCode =
  | 'invalid_request'
  | 'not_configured'
  | 'rate_limited'
  | 'upstream_error';

export type SearchErrorResponse = {
  error: string;
  code: SearchErrorCode;
};

export type SearchResponse = SearchSuccessResponse | SearchErrorResponse;

/**
 * How the currently displayed results were produced.
 *
 * The UI surfaces this, because a semantic hit whose name doesn't contain the
 * query looks like a bug unless the user knows why it's there.
 */
export type SearchMode = 'semantic' | 'name-match';

/**
 * Lifecycle of a search.
 *
 * `debouncing` is distinct from `loading` on purpose: during the debounce window
 * no request is in flight yet, so showing a spinner would be a lie and would
 * flicker on every keystroke.
 */
export type SearchStatus =
  | 'idle'
  | 'debouncing'
  | 'loading'
  | 'ready'
  | 'fallback';

export type ConditionSearchState = {
  status: SearchStatus;
  mode: SearchMode;
  /** Ranked slugs, best first. Empty when the mode is name-match. */
  results: SearchResult[];
  /** Similarity by slug, for rendering match strength. */
  similarityBySlug: Map<string, number>;
};

export type SearchRequestBody = {
  query: string;
  category?: ConditionCategory;
  limit?: number;
};
