/**
 * Site-wide configuration and metadata.
 * Single source of truth for org info — consumed by layout, SEO, footer, chatbot context.
 */

export const siteConfig = {
  name: 'Aware in Medicine',
  tagline: 'Making medical knowledge accessible for all.',
  description:
    'A nonprofit educational platform that breaks down medical conditions into clear, engaging explanations. Each week, we feature a new condition to help patients, students, and families better understand health.',
  url: 'https://www.awareinmedicine.org',
  contact: {
    email: 'awareinmedicine@gmail.com',
  },
  social: {
    tiktok: {
      handle: '@awareinmedicine',
      url: 'https://www.tiktok.com/@awareinmedicine',
    },
  },
  disclaimer:
    'The content shared through Aware in Medicine is intended for educational purposes only and should not be used as medical advice. Always consult qualified healthcare professionals for medical concerns or treatment decisions.',
} as const;

export type SiteConfig = typeof siteConfig;
