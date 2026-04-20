'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { ConditionCard } from '@/components/conditions/ConditionCard';
import { cn } from '@/lib/utils';
import type { Condition, ConditionCategory } from '@/types';

type ConditionsExplorerProps = {
  conditions: Condition[];
  categories: ConditionCategory[];
};

type SortMode = 'newest' | 'oldest' | 'alphabetical';

/**
 * Client-side interactive explorer for the Conditions Library.
 *
 * Filters by search term (name or full name match) and by category.
 * State is purely local.  No URL sync yet, but the shape of the
 * filter state is kept flat so it'd be trivial to wire to query params later.
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = conditions.filter((c) => {
      const matchesQuery =
        q === '' ||
        c.name.toLowerCase().includes(q) ||
        c.fullName?.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === 'All' || c.category === activeCategory;
      return matchesQuery && matchesCategory;
    });

    if (sort === 'newest') list = list.sort((a, b) => b.week - a.week);
    else if (sort === 'oldest') list = list.sort((a, b) => a.week - b.week);
    else list = list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [conditions, query, activeCategory, sort]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative max-w-xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search conditions by name…"
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
          count={conditions.length}
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
              count={count}
            >
              {cat}
            </CategoryChip>
          );
        })}
      </div>

      {/* Results meta + sort */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-cream-300">
        <p className="text-sm text-ink-soft" aria-live="polite">
          Showing <strong className="text-ink">{filtered.length}</strong>{' '}
          {filtered.length === 1 ? 'condition' : 'conditions'}
          {activeCategory !== 'All' && <> in {activeCategory}</>}
        </p>
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
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="alphabetical">A → Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-12 text-center py-16 rounded-3xl bg-cream-50 border border-dashed border-cream-300">
          <p className="font-serif text-2xl text-ink">No matches found.</p>
          <p className="mt-2 text-ink-soft">
            Try a different search term, or{' '}
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
              }}
              className="underline underline-offset-4 text-clay-500 hover:text-clay-600"
            >
              clear filters
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <ConditionCard key={c.slug} condition={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
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
      <span
        className={cn(
          'text-xs',
          active ? 'text-cream-100/80' : 'text-ink-muted'
        )}
      >
        {count}
      </span>
    </button>
  );
}
