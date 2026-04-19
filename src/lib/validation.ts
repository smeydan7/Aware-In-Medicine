import { z } from 'zod';

/**
 * Shared validation schema for condition suggestions.
 *
 * Used by:
 *   - the SuggestionForm client component (real-time validation)
 *   - the /api/suggestions route (server-side validation)
 *
 * Keeping one schema in /lib/ means the front-end and back-end can never
 * drift on what counts as a valid submission.
 */

export const suggestionSchema = z.object({
  condition: z
    .string()
    .trim()
    .min(2, 'Please enter at least 2 characters.')
    .max(120, 'Please keep it under 120 characters.'),
  context: z
    .string()
    .trim()
    .max(500, 'Please keep it under 500 characters.')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .email('That does not look like a valid email.')
    .optional()
    .or(z.literal('')),
});

export type SuggestionInput = z.infer<typeof suggestionSchema>;
