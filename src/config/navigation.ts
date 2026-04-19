/**
 * Primary navigation — edit here to change nav across header + footer + mobile menu.
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/', description: 'Welcome and mission' },
  {
    label: 'Learn the Basics',
    href: '/learn',
    description: 'Practical healthcare literacy',
  },
  {
    label: 'Conditions Library',
    href: '/conditions',
    description: 'Browse every condition we cover',
  },
  {
    label: 'Weekly Updates',
    href: '/weekly-updates',
    description: 'Timeline of featured conditions',
  },
  {
    label: 'Suggest a Condition',
    href: '/suggest',
    description: 'Request a future topic',
  },
];
