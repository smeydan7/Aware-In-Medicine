import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Condition } from '@/types';

type ConditionCardProps = {
  condition: Condition;
  /**
   * Short description, shown only during semantic search.
   *
   * Browsing the full library is a scanning task, and 69 summaries at once is
   * noise. A search result is a reading task, where the summary is how you
   * decide whether the hit is the thing you meant.
   */
  summary?: string;
  /**
   * Symptoms that share wording with the query. Rendered as chips so a hit
   * whose *name* has nothing to do with the query still explains itself.
   */
  matchedSymptoms?: string[];
};

/**
 * A single condition card. Renders a semantic <article> with its anchor
 * so deep links (e.g. /conditions#adhd) can scroll right to it.
 */
export function ConditionCard({
  condition,
  summary,
  matchedSymptoms,
}: ConditionCardProps) {
  const { slug, name, fullName, category, week, tiktokUrl } = condition;

  return (
    <article
      id={slug}
      className="group relative p-6 rounded-3xl bg-cream-50 border border-cream-200 hover:border-clay-200 hover:shadow-soft transition-all duration-300 scroll-mt-24"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Week {week}
            </span>
            <span className="text-ink-faint" aria-hidden>·</span>
            <Badge tone="sage">{category}</Badge>
          </div>

          <h3 className="font-serif text-2xl text-ink leading-tight">
            What is {name}?
          </h3>
          {fullName && (
            <p className="mt-1.5 text-sm text-ink-muted italic">
              a.k.a. {fullName}
            </p>
          )}
        </div>
      </div>

      {summary && (
        <p className="mt-4 text-sm text-ink-soft leading-relaxed line-clamp-3">
          {summary}
        </p>
      )}

      {matchedSymptoms && matchedSymptoms.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
            Matching symptoms
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {matchedSymptoms.map((symptom) => (
              <li
                key={symptom}
                className="px-2.5 py-1 rounded-full bg-cream-200 text-xs text-ink-soft"
              >
                {symptom}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tiktokUrl && (
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-clay-500 hover:text-clay-600 font-medium"
        >
          Watch on TikTok
          <ExternalLink className="w-3.5 h-3.5" aria-hidden />
        </a>
      )}
    </article>
  );
}
