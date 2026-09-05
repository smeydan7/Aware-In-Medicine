'use client';

import { useEffect, useRef, useState } from 'react';
import { features } from '@/config/features';
import type {
  ConditionSearchState,
  SearchResponse,
  SearchResult,
} from '@/types/search';

/**
 * Debounced semantic search against /api/search.
 *
 * Owns every asynchronous concern so the explorer component can stay a pure
 * rendering of state:
 *
 *   - waits for a pause in typing before spending a paid embedding call
 *   - aborts superseded requests, so a slow early response can never overwrite
 *     the results of a later query
 *   - keeps the previous result set visible while a new one loads, instead of
 *     blanking the grid on every keystroke
 *   - falls back to name matching on any failure, and stays fallen back for the
 *     rest of the session once the server says search isn't configured
 */

const { debounceMs, minQueryLength, maxResults, enabled } =
  features.semanticSearch;

const EMPTY_STATE: ConditionSearchState = {
  status: 'idle',
  mode: 'name-match',
  results: [],
  similarityBySlug: new Map(),
};

type UseConditionSearchArgs = {
  query: string;
  /** Undefined means "all categories". Filtered server-side, before the limit. */
  category?: string;
};

export function useConditionSearch({
  query,
  category,
}: UseConditionSearchArgs): ConditionSearchState {
  const [state, setState] = useState<ConditionSearchState>(EMPTY_STATE);

  /**
   * Set once the server reports the feature isn't configured. There is no point
   * re-asking on every keystroke for the rest of the session — the answer will
   * not change until the server restarts with different env vars.
   */
  const disabledForSession = useRef(!enabled);

  const trimmed = query.trim();
  const active = trimmed.length >= minQueryLength;

  useEffect(() => {
    if (!active || disabledForSession.current) {
      setState(EMPTY_STATE);
      return;
    }

    // Shown immediately, before any request exists. Distinct from 'loading' so
    // the UI can avoid flashing a spinner on every keystroke.
    setState((prev) => ({ ...prev, status: 'debouncing' }));

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setState((prev) => ({ ...prev, status: 'loading' }));

      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: trimmed,
            category,
            limit: maxResults,
          }),
          signal: controller.signal,
        });

        const body = (await res.json()) as SearchResponse;

        if (!res.ok) {
          // 'not_configured' is permanent for this server; everything else
          // (rate limit, upstream blip) may recover, so only the former latches.
          if ('code' in body && body.code === 'not_configured') {
            disabledForSession.current = true;
          }
          setState({ ...EMPTY_STATE, status: 'fallback' });
          return;
        }

        const results = ('results' in body ? body.results : []) as SearchResult[];

        setState({
          status: 'ready',
          mode: 'semantic',
          results,
          similarityBySlug: new Map(
            results.map((r) => [r.slug, r.similarity] as const)
          ),
        });
      } catch (err) {
        // An abort is the expected outcome of typing another character — it
        // means a newer request has taken over, so leave state alone.
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setState({ ...EMPTY_STATE, status: 'fallback' });
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed, category, active]);

  return state;
}
