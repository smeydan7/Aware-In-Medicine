import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { sortedArticles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'In-depth, research-backed reads from the Aware in Medicine editorial fellows. Clear explanations of the conditions that shape our health.',
};

export default function ArticlesPage() {
  const [lead, ...rest] = sortedArticles;

  return (
    <>
      {/* Page header */}
      <section className="pt-14 md:pt-20 pb-10 md:pb-12">
        <Container>
          <p className="eyebrow mb-5">Articles</p>
          <h1 className="font-serif text-display-lg text-balance text-ink max-w-3xl">
            In-depth reads, in plain language.
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-2xl leading-relaxed">
            Longer-form pieces from our editorial fellows — the science behind
            the conditions that shape our health, written to be understood.
          </p>
        </Container>
      </section>

      {/* Lead story */}
      {lead && (
        <section className="pb-8">
          <Container>
            <ArticleCard article={lead} variant="feature" />
          </Container>
        </section>
      )}

      {/* Rest of the grid */}
      <section className="pb-24">
        <Container>
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
