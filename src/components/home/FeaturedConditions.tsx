import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { conditions } from '@/data/conditions';

/**
 * Shows the six most recent conditions as a preview strip on the homepage.
 * Links through to the full library.
 */
export function FeaturedConditions() {
  const recent = [...conditions].sort((a, b) => b.week - a.week).slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream-50 to-cream-100">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">Recently featured</p>
            <h2 className="font-serif text-display-md text-ink">
              Fresh from the library
            </h2>
          </div>
          <Button href="/conditions" variant="ghost" size="md">
            See all {conditions.length} conditions
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((c) => (
            <Link
              key={c.slug}
              href={`/conditions#${c.slug}`}
              className="group p-6 rounded-3xl bg-cream-50 border border-cream-200 hover:border-clay-200 hover:bg-cream-50 hover:shadow-soft transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                    Week {c.week}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-ink group-hover:text-clay-600 transition-colors">
                    {c.name}
                  </h3>
                  {c.fullName && (
                    <p className="mt-1 text-sm text-ink-muted italic">
                      {c.fullName}
                    </p>
                  )}
                </div>
                <Badge tone="sage">{c.category}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
