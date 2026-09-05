'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X, Loader2, Sparkles } from 'lucide-react';
import { ConditionCard } from '@/components/conditions/ConditionCard';
import { useConditionSearch } from '@/hooks/useConditionSearch';
import { matchedSymptoms } from '@/lib/match-reason';
import { features } from '@/config/features';
import { cn } from '@/lib/utils';
import type { ConditionCategory } from '@/types';
import type { EnrichedCondition } from '@/types/enriched';

type ConditionsExplorerProps = {
  conditions: EnrichedCondition[];
  categories: ConditionCategory[];
};

type SortMode = 'relevance' | 'newest' | 'oldest' | 'alphabetical';

const { minQueryLength } = features.semanticSearch;

/**
 * Client-side interactive explorer for the Conditions Library.
 *
 * Runs in one of two modes, chosen automatically:
 *
 *   semantic   — the query is embedded and matched against condition meaning,
 *                so "joints hurt in the morning" finds rheumatoid arthritis.
 *                Ranking, category filtering and result count all come from
 *                the server.
 *
 *   name-match — the original substring filter over name and fullName. Used
 *                when the query is too short to be worth an API call, and as
 *                the fallback whenever semantic search is unavailable.
 *
 * The fallback is the important part: if the search API is down, misconfigured
 * or rate-limiting, the box keeps working and simply gets less clever. It never
 * shows an error and never stops returning results.
 */
export function ConditionsExplorer({
  conditions,
  categories,
}: ConditionsExplorerProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ConditionCategory | 'All'>(
    'All'
  );
  const [sort, setSort] = useState<SortMode>('newest');

  const search = useConditionSearch({
    query,
    // Category is pushed into the search RPC rather than applied to its output:
    // filtering the top 12 afterwards would ask for twelve results and show
    // four. The top-K has to be K of the right category.
    category: activeCategory === 'All' ? undefined : activeCategory,
  });

  const semanticActive = search.mode === 'semantic';
  const busy = search.status === 'debouncing' || search.status === 'loading';

  const conditionsBySlug = useMemo(
    () => new Map(conditions.map((c) => [c.slug, c])),
    [conditions]
  );

  /**
   * Relevance becomes the default the moment semantic results appear, and
   * reverts when they go away — sorting a ranked result set by week would throw
   * away the ranking we just paid to compute.
   *
   * An explicit choice of A→Z or oldest-first is left alone, on the assumption
   * that someone who picked a sort meant it.
   */
  useEffect(() => {
    setSort((current) => {
      if (semanticActive) return current === 'newest' ? 'relevance' : current;
      return current === 'relevance' ? 'newest' : current;
    });
  }, [semanticActive]);

  const filtered = useMemo(() => {
    if (semanticActive) {
      // Results arrive as slugs, already ranked and already category-filtered.
      // Rehydrate them against the data the client is holding anyway.
      const ranked = search.results
        .map((result) => conditionsBySlug.get(result.slug))
        .filter((c): c is EnrichedCondition => c !== undefined);

      return sortConditions(ranked, sort);
    }

    const q = query.trim().toLowerCase();
    const list = conditions.filter((c) => {
      const matchesQuery =
        q === '' ||
        c.name.toLowerCase().includes(q) ||
        c.fullName?.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === 'All' || c.category === activeCategory;
      return matchesQuery && matchesCategory;
    });

    // 'relevance' is meaningless without semantic results.
    return sortConditions(list, sort === 'relevance' ? 'newest' : sort);
  }, [
    conditions,
    conditionsBySlug,
    query,
    activeCategory,
    sort,
    semanticActive,
    search.results,
  ]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative max-w-xl">
        {busy ? (
          <Loader2
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-clay-400 animate-spin"
            aria-hidden
          />
        ) : (
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted"
            aria-hidden
          />
        )}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, or describe how you feel…"
          aria-label="Search conditions"
          className="w-full h-12 pl-11 pr-11 rounded-full bg-cream-50 border border-cream-300 focus:border-clay-300 focus:ring-0 focus:outline-none placeholder:text-ink-muted text-ink"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full text-ink-muted hover:bg-cream-200 hover:text-ink flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <CategoryChip
          active={activeCategory === 'All'}
          onClick={() => setActiveCategory('All')}
          // Counts are suppressed during a semantic search: they're computed
          // from the whole library, but the grid is showing a ranked top-N.
          // A chip reading "Autoimmune 9" above four results is just wrong.
          count={semanticActive ? undefined : conditions.length}
        >
          All
        </CategoryChip>
        {categories.map((cat) => {
          const count = conditions.filter((c) => c.category === cat).length;
          return (
            <CategoryChip
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              count={semanticActive ? undefined : count}
            >
              {cat}
            </CategoryChip>
          );
        })}
      </div>

      {/* Results meta + sort */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-cream-300">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm text-ink-soft" aria-live="polite">
            Showing <strong className="text-ink">{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'condition' : 'conditions'}
            {activeCategory !== 'All' && <> in {activeCategory}</>}
          </p>
          {semanticActive && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-clay-100 text-xs font-medium text-clay-600"
              title="Results are ranked by meaning, not just name matches."
            >
              <Sparkles className="w-3 h-3" aria-hidden />
              AI search
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="sort" className="text-ink-muted">
            Sort:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="bg-transparent border-0 font-medium text-ink cursor-pointer focus:ring-0"
          >
            <option value="relevance" disabled={!semanticActive}>
              Best match
            </option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="alphabetical">A → Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-12 text-center py-16 rounded-3xl bg-cream-50 border border-dashed border-cream-300">
          <p className="font-serif text-2xl text-ink">
            {busy ? 'Searching…' : 'No matches found.'}
          </p>
          {!busy && (
            <EmptyStateHint
              query={query}
              onClear={() => {
                setQuery('');
                setActiveCategory('All');
              }}
            />
          )}
        </div>
      ) : (
        <div
          className={cn(
            'mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 transition-opacity',
            // Dim rather than blank while a new search lands, so the grid
            // doesn't collapse and reflow on every keystroke.
            busy && semanticActive && 'opacity-60'
          )}
        >
          {filtered.map((c) => (
            <ConditionCard
              key={c.slug}
              condition={c}
              summary={semanticActive ? c.summary : undefined}
              matchedSymptoms={
                semanticActive ? matchedSymptoms(c, query) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Explains an empty grid.
 *
 * A query shorter than the minimum is a different situation from a query that
 * genuinely matched nothing: the first is "keep typing", the second is "try
 * something else". Saying "no matches" to someone who has typed two characters
 * is misleading — the search never ran.
 */
function EmptyStateHint({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  const trimmed = query.trim();

  if (trimmed.length > 0 && trimmed.length < minQueryLength) {
    return (
      <p className="mt-2 text-ink-soft">
        Type at least {minQueryLength} characters to search by description.
      </p>
    );
  }

  return (
    <p className="mt-2 text-ink-soft">
      Try describing a symptom instead of a name, or{' '}
      <button
        onClick={onClear}
        className="underline underline-offset-4 text-clay-500 hover:text-clay-600"
      >
        clear filters
      </button>
      .
    </p>
  );
}

/** Non-mutating sort. `relevance` preserves the server's ranking. */
function sortConditions(
  list: EnrichedCondition[],
  sort: SortMode
): EnrichedCondition[] {
  if (sort === 'relevance') return list;

  const sorted = [...list];
  if (sort === 'newest') return sorted.sort((a, b) => b.week - a.week);
  if (sort === 'oldest') return sorted.sort((a, b) => a.week - b.week);
  return sorted.sort((a, b) => a.name.localeCompare(b.name));
}

function CategoryChip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all',
        active
          ? 'bg-clay-400 text-cream-50 border-clay-400'
          : 'bg-cream-50 text-ink-soft border border-cream-300 hover:border-clay-200 hover:text-ink'
      )}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span
          className={cn(
            'text-xs',
            active ? 'text-cream-100/80' : 'text-ink-muted'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
