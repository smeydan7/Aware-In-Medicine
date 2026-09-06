import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, User, Download } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ArticleBody } from '@/components/articles/ArticleBody';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getArticleBySlug, articleSlugs, sortedArticles } from '@/data/articles';
import { getArticleContent } from '@/data/article-content';
import { formatArticleDate } from '@/lib/articles';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articleSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Article not found' };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: Params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const { title, subtitle, author, date, readingTime, category, pdf } = article;
  const blocks = getArticleContent(article.slug);

  const related = sortedArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="pt-10 md:pt-14 pb-8 border-b border-cream-200 bg-cream-50">
        <Container size="narrow">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-clay-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            All articles
          </Link>

          <div className="mt-6 flex items-center gap-2">
            <Badge tone="sage">{category}</Badge>
          </div>

          <h1 className="mt-4 font-serif text-display-md md:text-display-lg text-balance text-ink">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg md:text-xl text-ink-soft leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4" aria-hidden />
              {author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden />
              {formatArticleDate(date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden />
              {readingTime} read
            </span>
          </div>
        </Container>
      </section>

      {/* Article body (embedded text) */}
      <section className="py-10 md:py-14">
        <Container>
          <ArticleBody blocks={blocks} />

          <div className="mt-14 pt-6 border-t border-cream-200">
            <a
              href={pdf}
              download
              className="inline-flex items-center gap-2 rounded-full bg-clay-500 px-5 py-3 text-sm font-medium text-cream-50 shadow-soft hover:bg-clay-600 transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden />
              Download the original PDF
            </a>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-24 pt-4">
          <Container>
            <h2 className="font-serif text-2xl text-ink mb-8">More articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
