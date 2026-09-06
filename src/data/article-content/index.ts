import type { ArticleBlock } from '@/types';
import content from '../generated/article-content.json';

/**
 * Full article body content, embedded directly into the site (no PDF).
 *
 * Generated from the source PDFs by `scripts/build-articles.cjs` into
 * `generated/article-content.json` (keyed by slug). Do not edit by hand —
 * re-run `npm run articles` (or just `npm run dev`) to regenerate.
 */
export const articleContent = content as Record<string, ArticleBlock[]>;

export function getArticleContent(slug: string): ArticleBlock[] {
  return articleContent[slug] ?? [];
}
