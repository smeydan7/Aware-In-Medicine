/**
 * Shared type definitions across the app.
 */

export type Condition = {
  /** URL-safe slug, e.g. "adhd" or "crohns-disease". */
  slug: string;
  /** Display name, e.g. "ADHD". */
  name: string;
  /** Full medical name, e.g. "attention deficit hyperactivity disorder". */
  fullName?: string;
  /** Short one-liner shown on cards. */
  summary?: string;
  /** Body-system category used for filtering. */
  category: ConditionCategory;
  /** Week number this was featured (1-indexed). */
  week: number;
  /** Optional direct link to the TikTok video. */
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
