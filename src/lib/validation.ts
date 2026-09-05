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

/**
 * Shared validation schema for semantic condition search.
 *
 * Used by:
 *   - the useConditionSearch hook (gates requests before they're sent)
 *   - the /api/search route (server-side validation)
 *
 * The 3-character minimum is a cost control as much as a quality one: every
 * accepted query is a paid embedding call, and one- or two-letter fragments
 * produce vectors too vague to rank anything usefully.
 */
export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(3, 'Type at least 3 characters to search.')
    .max(200, 'Please keep your search under 200 characters.'),
  // Validated as a bounded string rather than a z.enum of the category union:
  // building that enum would mean importing the conditions dataset into this
  // module, which the client-side SuggestionForm also imports — pulling ~15KB
  // of condition data into a bundle that has no use for it. The value is passed
  // as a bound parameter to the search RPC, so an unrecognised category simply
  // matches nothing.
  category: z.string().trim().min(1).max(60).optional(),
  limit: z.number().int().min(1).max(50).optional(),
});

export type SearchInput = z.infer<typeof searchSchema>;
