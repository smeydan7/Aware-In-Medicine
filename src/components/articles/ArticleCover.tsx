'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/articles';
import type { Article } from '@/types';

type ArticleCoverProps = {
  article: Pick<Article, 'slug' | 'author' | 'category' | 'cover'>;
  className?: string;
  /** Larger monogram fallback for hero/featured placements */
  size?: 'sm' | 'lg';
};

/**
 * Visual for an article preview. Uses the separated preview image at
 * /articles/previews/<slug>-preview.png (or an explicit `cover`). All
 * previews render in a fixed aspect box with object-cover, so they appear
 * at a uniform size regardless of the source image's dimensions.
 *
 * A plain <img> is used (not next/image) so a missing preview simply
 * triggers the branded monogram fallback instead of a server-side
 * image-optimizer error.
 */
export function ArticleCover({ article, className, size = 'sm' }: ArticleCoverProps) {
  const src = article.cover ?? `/articles/previews/${article.slug}-preview.png`;
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-cream-200', className)}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}

      {failed && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-clay-400 via-clay-500 to-clay-700"
          aria-hidden
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cream-50/10" />
          <div className="absolute -left-8 -bottom-12 h-44 w-44 rounded-full bg-cream-50/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={cn(
                'font-serif tracking-tight text-cream-50/95',
                size === 'lg' ? 'text-6xl md:text-7xl' : 'text-4xl'
              )}
            >
              {getInitials(article.author)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
