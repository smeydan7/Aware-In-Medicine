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
