import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names with conflict resolution.
 * Use wherever you'd combine classes conditionally:
 *   cn('p-4', condition && 'bg-clay-400', 'text-ink')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Slugify a condition name for use in URLs.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
