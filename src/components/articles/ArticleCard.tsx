import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ArticleCover } from '@/components/articles/ArticleCover';
import { formatArticleDate } from '@/lib/articles';
import { cn } from '@/lib/utils';
import type { Article } from '@/types';

type ArticleCardProps = {
  article: Article;
  /** 'feature' renders a larger side-by-side layout for the lead story. */
  variant?: 'default' | 'feature';
};

/**
 * A single article card linking to its full page. Reused on the Articles
 * listing page. The `feature` variant is used for the lead story.
 */
export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const { slug, title, subtitle, author, date, readingTime, category, excerpt } =
    article;
  const href = `/articles/${slug}`;

  if (variant === 'feature') {
    return (
      <article className="group relative rounded-3xl bg-cream-50 border border-cream-200 hover:border-clay-200 hover:shadow-lift transition-all duration-300 overflow-hidden">
        <Link href={href} className="grid md:grid-cols-2 focus:outline-none">
          <ArticleCover
            article={article}
            size="lg"
            className="min-h-[16rem] md:min-h-full"
          />
          <div className="p-7 md:p-10 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Badge tone="sage">{category}</Badge>
              <span className="text-ink-faint" aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <Clock className="w-3.5 h-3.5" aria-hidden />
                {readingTime}
              </span>
            </div>
            <h3 className="font-serif text-display-md text-ink leading-tight text-balance">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-3 text-ink-soft text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
            <p className="mt-5 text-sm text-ink-soft leading-relaxed line-clamp-3">
              {excerpt}
            </p>
            <div className="mt-auto pt-7 flex items-center justify-between">
              <div className="text-sm">
                <span className="text-ink font-medium">{author}</span>
                <span className="text-ink-faint"> · </span>
                <span className="text-ink-muted">{formatArticleDate(date)}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm text-clay-500 font-medium group-hover:gap-2.5 transition-all">
                Read
                <ArrowRight className="w-4 h-4" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group relative rounded-3xl bg-cream-50 border border-cream-200 hover:border-clay-200 hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col">
      <Link href={href} className="flex flex-col h-full focus:outline-none">
        <ArticleCover article={article} className="aspect-[16/10]" />
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge tone="sage">{category}</Badge>
            <span className="text-ink-faint" aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5" aria-hidden />
              {readingTime}
            </span>
          </div>
          <h3 className="font-serif text-xl text-ink leading-snug text-balance">
            {title}
          </h3>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          <div className="mt-auto pt-5 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-ink font-medium">{author}</span>
              <span className="text-ink-faint"> · </span>
              <span className="text-ink-muted">{formatArticleDate(date)}</span>
            </div>
            <ArrowRight
              className="w-4 h-4 text-clay-500 group-hover:translate-x-0.5 transition-transform"
              aria-hidden
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
