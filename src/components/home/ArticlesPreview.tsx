'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ArticleCover } from '@/components/articles/ArticleCover';
import { formatArticleDate } from '@/lib/articles';
import { cn } from '@/lib/utils';
import type { Article } from '@/types';

type ArticlesPreviewProps = {
  articles: Article[];
  /** Auto-advance interval in ms; set 0 to disable. */
  interval?: number;
};

/**
 * Home-page sliding preview of the latest articles. Scrolls through a
 * preview of each article; clicking a slide opens that article's page.
 *
 * Uses native scroll-snap for smooth, accessible horizontal scrolling,
 * with arrow controls, dot indicators, and gentle auto-advance that
 * pauses on hover/focus.
 */
export function ArticlesPreview({ articles, interval = 5000 }: ArticlesPreviewProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const count = items.length;
    if (count === 0) return;
    const i = ((index % count) + count) % count;
    const target = items[i];
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }, []);

  // Track which slide is centered while the user scrolls.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let min = Infinity;
        items.forEach((el, i) => {
          const elCenter = el.offsetLeft - track.offsetLeft + el.clientWidth / 2;
          const dist = Math.abs(elCenter - center);
          if (dist < min) {
            min = dist;
            closest = i;
          }
        });
        setActive(closest);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Auto-advance.
  useEffect(() => {
    if (!interval || paused || articles.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % articles.length;
        scrollToIndex(next);
        return next;
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, paused, articles.length, scrollToIndex]);

  if (articles.length === 0) return null;

  return (
    <section
      className="py-20 md:py-28"
      aria-roledescription="carousel"
      aria-label="Latest articles"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container>
        <div className="flex items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">From the journal</p>
            <h2 className="font-serif text-display-lg text-balance text-ink">
              Latest articles:
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              className="w-11 h-11 rounded-full border border-cream-300 text-ink hover:bg-cream-200 hover:border-clay-200 transition-colors inline-flex items-center justify-center"
              aria-label="Previous article"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              className="w-11 h-11 rounded-full border border-cream-300 text-ink hover:bg-cream-200 hover:border-clay-200 transition-colors inline-flex items-center justify-center"
              aria-label="Next article"
            >
              <ChevronRight className="w-5 h-5" aria-hidden />
            </button>
          </div>
        </div>
      </Container>

      {/* Scroller — constrained to the container width with generous side
          padding so slides never span the whole screen and the neighbours
          peek in with breathing room. */}
      <ul
        ref={trackRef}
        className="mx-auto max-w-7xl flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-px-8 pb-4 no-scrollbar px-8 sm:px-12 lg:px-16"
        style={{ scrollbarWidth: 'none' }}
      >
        {articles.map((article, i) => (
          <li
            key={article.slug}
            className="snap-start shrink-0 w-[72%] sm:w-[46%] lg:w-[31%] xl:w-[27%]"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${articles.length}`}
          >
            <Link
              href={`/articles/${article.slug}`}
              className="group block h-full rounded-3xl bg-cream-50 border border-cream-200 hover:border-clay-200 hover:shadow-lift transition-all duration-300 overflow-hidden focus:outline-none"
            >
              <ArticleCover article={article} className="aspect-[16/9]" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge tone="sage">{article.category}</Badge>
                  <span className="text-ink-faint" aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                    <Clock className="w-3.5 h-3.5" aria-hidden />
                    {article.readingTime}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-ink leading-snug text-balance">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-ink-muted">
                    {article.author} · {formatArticleDate(article.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-clay-500 font-medium group-hover:gap-2.5 transition-all">
                    Read
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Dots */}
      <Container>
        <div className="mt-6 flex items-center justify-center gap-2">
          {articles.map((article, i) => (
            <button
              key={article.slug}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to article ${i + 1}`}
              aria-current={i === active}
              className={cn(
                'h-2 rounded-full transition-all',
                i === active ? 'w-6 bg-clay-500' : 'w-2 bg-cream-300 hover:bg-clay-200'
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
