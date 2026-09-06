import type { Article } from '@/types';
import generated from './generated/articles.json';
import { articleOverrides, DEFAULT_CATEGORY } from './article-overrides';

/**
 * All articles in the Articles section.
 *
 * This is assembled automatically:
 *   - `generated/articles.json` is produced from the PDFs by
 *     `scripts/build-articles.cjs` (runs on `npm run dev` / `build`).
 *   - `article-overrides.ts` layers on the category / featured flag.
 *
 * To add an article you normally only drop `<slug>.pdf` into
 * public/articles/ and `<slug>-preview.png` into public/articles/previews/.
 * See SETUP.md.
 */
export const articles: Article[] = (generated as Article[]).map((a) => ({
  ...a,
  category: articleOverrides[a.slug]?.category ?? a.category ?? DEFAULT_CATEGORY,
  ...articleOverrides[a.slug],
}));

/** Articles sorted for display: featured first, then newest date. */
export const sortedArticles: Article[] = [...articles].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return b.date.localeCompare(a.date);
});

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const articleSlugs: string[] = articles.map((a) => a.slug);
