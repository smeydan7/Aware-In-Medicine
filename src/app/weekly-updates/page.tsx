import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { conditions } from '@/data/conditions';

export const metadata: Metadata = {
  title: 'Weekly Updates',
  description:
    'A timeline of every medical condition featured on Aware in Medicine, week by week.',
};

export default function WeeklyUpdatesPage() {
  // Newest first
  const timeline = [...conditions].sort((a, b) => b.week - a.week);
  const latest = timeline[0];

  return (
    <>
      {/* Header */}
      <section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <Container>
          <p className="eyebrow mb-5">Weekly Updates</p>
          <h1 className="font-serif text-display-lg text-balance text-ink max-w-3xl">
            Every week, a new condition. {conditions.length} and counting.
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-2xl leading-relaxed">
            A timeline of every condition we've featured — from the first
            video through the most recent. Documenting each topic builds a
            growing archive of accessible medical education.
          </p>
        </Container>
      </section>

      {/* Latest highlight */}
      {latest && (
        <section className="pb-8">
          <Container>
            <Link
              href={`/conditions#${latest.slug}`}
              className="group block p-8 md:p-10 rounded-3xl bg-clay-50 border border-clay-100 hover:border-clay-200 hover:shadow-soft transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <Badge tone="clay" className="mb-4">
                    Just featured
                  </Badge>
                  <h2 className="font-serif text-display-md text-ink group-hover:text-clay-600 transition-colors">
                    Week {latest.week}: What is {latest.name}?
                  </h2>
                  {latest.fullName && (
                    <p className="mt-2 text-ink-muted italic">
                      a.k.a. {latest.fullName}
                    </p>
                  )}
                </div>
                <span
                  className="text-clay-500 font-medium whitespace-nowrap"
                  aria-hidden
                >
                  Read more →
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* Timeline */}
      <section className="pb-24">
        <Container size="narrow">
          <ol className="relative">
            {/* Vertical rule */}
            <span
              className="absolute left-[11px] top-2 bottom-2 w-px bg-cream-300"
              aria-hidden
            />

            {timeline.map((c) => (
              <li key={c.slug} className="relative pl-12 pb-8 last:pb-0">
                {/* Dot */}
                <span
                  className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-clay-300 bg-cream-50 flex items-center justify-center"
                  aria-hidden
                >
                  <span className="w-2 h-2 rounded-full bg-clay-400" />
                </span>

                <Link
                  href={`/conditions#${c.slug}`}
                  className="group block"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                      Week {c.week}
                    </span>
                    <span className="text-ink-faint" aria-hidden>·</span>
                    <Badge tone="sage">{c.category}</Badge>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-clay-600 transition-colors">
                    What is {c.name}?
                  </h3>
                  {c.fullName && (
                    <p className="mt-1 text-sm text-ink-muted italic">
                      a.k.a. {c.fullName}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
