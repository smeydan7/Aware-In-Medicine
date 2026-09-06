import type { Article, ConditionCategory } from '@/types';

/**
 * Per-article overrides for values that can't be read from a PDF.
 *
 * The build script (scripts/build-articles.cjs) auto-extracts title, author,
 * date, reading time, subtitle, excerpt and the full body from each PDF.
 * The only things it can't know are the **category** and whether an article
 * is **featured** — set those here.
 *
 * This is entirely optional: an article with no entry still works (its
 * category defaults to "Other"). You can also override any auto-extracted
 * field here (e.g. `title`, `excerpt`) if you want to tweak it by hand.
 */
export const articleOverrides: Record<string, Partial<Article>> = {
  'andrew-li': { category: 'Cardiovascular', featured: true },
  'gerald-szeto': { category: 'Infectious', featured: true },
  'sophia-bhatti': { category: 'Reproductive', featured: true },
  'isabella-wang': { category: 'Neurological' },
  'elia-ma': { category: 'Infectious' },
  'matthias-seuntjens': { category: 'Blood & Circulatory' },
  'maxine-krylov': { category: 'Dermatological' },
  'bernardo-costa': { category: 'Autoimmune' },
  'stefan-szeto': { category: 'Mental Health' },
};

/** Category applied when an article has no override. */
export const DEFAULT_CATEGORY: ConditionCategory = 'Other';
