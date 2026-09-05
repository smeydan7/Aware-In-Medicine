import type { EnrichedCondition } from '@/types/enriched';

/**
 * Explains why a semantic hit matched.
 *
 * This exists because semantic search's biggest strength is also its biggest
 * usability problem: searching "joints hurt in the morning" surfaces rheumatoid
 * arthritis, whose name shares not one character with the query. Without a
 * visible reason, a correct result looks like a bug.
 *
 * The matching here is deliberately crude — plain token overlap, no stemming or
 * synonyms. It is not doing the retrieval; the embedding already did that. Its
 * only job is to point at the part of the condition that most likely earned the
 * hit, and it stays silent rather than guessing when nothing overlaps.
 */

/**
 * Words too common to be evidence of anything. Kept short on purpose: this is a
 * display heuristic, and an over-aggressive list would blank out real matches.
 */
const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'have', 'has', 'had', 'was', 'were',
  'are', 'is', 'be', 'been', 'my', 'me', 'i', 'you', 'your', 'it', 'its',
  'this', 'that', 'these', 'those', 'of', 'in', 'on', 'at', 'to', 'from',
  'why', 'what', 'when', 'how', 'do', 'does', 'did', 'can', 'get', 'got',
  'feel', 'feels', 'feeling', 'like', 'a', 'an', 'or', 'but', 'if', 'so',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

/**
 * Returns up to `max` of the condition's symptoms that share a word with the
 * query. Empty when nothing overlaps — the caller should show the summary alone
 * rather than inventing a reason.
 */
export function matchedSymptoms(
  condition: EnrichedCondition,
  query: string,
  max = 3
): string[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const matches = condition.symptoms.filter((symptom) => {
    const symptomText = symptom.toLowerCase();
    return tokens.some((token) => symptomText.includes(token));
  });

  return matches.slice(0, max);
}
