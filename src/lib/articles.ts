/**
 * Small presentation helpers shared across the Articles UI.
 * Pure functions only, so they can be used from server or client components.
 */

/** Format an ISO date ('2026-09-01') as 'September 1, 2026'. */
export function formatArticleDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Author initials for the generated cover monogram, e.g. 'Andrew Li' -> 'AL'. */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
  return (first + last).toUpperCase();
}
