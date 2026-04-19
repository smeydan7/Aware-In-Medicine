import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ConditionsExplorer } from '@/components/conditions/ConditionsExplorer';
import { conditions, allCategories } from '@/data/conditions';

export const metadata: Metadata = {
  title: 'Conditions Library',
  description:
    'Browse every medical condition featured on Aware in Medicine. Search by name or filter by body system.',
};

export default function ConditionsPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <Container>
          <p className="eyebrow mb-5">Conditions Library</p>
          <h1 className="font-serif text-display-lg text-balance text-ink max-w-3xl">
            A growing archive of health education resources.
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-2xl leading-relaxed">
            Every condition we've covered, organized so you can find what you
            need. Search by name or filter by body system.
          </p>
        </Container>
      </section>

      {/* Explorer */}
      <section className="pb-24">
        <Container>
          <ConditionsExplorer conditions={conditions} categories={allCategories} />
        </Container>
      </section>
    </>
  );
}
