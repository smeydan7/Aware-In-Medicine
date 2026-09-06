/**
 * Shared type definitions across the app.
 */

export type Condition = {
  slug: string;
  name: string;
  fullName?: string;
  summary?: string;
  category: ConditionCategory;
  week: number;
  tiktokUrl?: string;
};

export type ConditionCategory =
  | 'Neurological'
  | 'Mental Health'
  | 'Autoimmune'
  | 'Endocrine'
  | 'Digestive'
  | 'Respiratory'
  | 'Cardiovascular'
  | 'Musculoskeletal'
  | 'Dermatological'
  | 'Reproductive'
  | 'Infectious'
  | 'Blood & Circulatory'
  | 'Genetic'
  | 'Sensory'
  | 'Other';

/** A single rendered block of an article's body. */
export type ArticleBlock = {
  type: 'heading' | 'paragraph' | 'reference';
  text: string;
};

export type Article = {
  /** URL slug; must match the PDF filename in /public/articles/<slug>.pdf */
  slug: string;
  title: string;
  /** Short deck / subtitle shown under the title */
  subtitle?: string;
  author: string;
  /** ISO date string, e.g. '2026-09-01' */
  date: string;
  /** Human-readable reading time, e.g. '7 min' */
  readingTime: string;
  category: ConditionCategory;
  /** 1–2 sentence teaser for cards and the preview carousel */
  excerpt: string;
  /** Public path to the PDF, e.g. '/articles/andrew-li.pdf' */
  pdf: string;
  /** Optional cover image path under /public; falls back to a generated cover */
  cover?: string;
  /** Surface this article first in listings and the home carousel */
  featured?: boolean;
};

export type LearnTopic = {
  id: string;
  title: string;
  summary: string;
  content: string[];
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};
