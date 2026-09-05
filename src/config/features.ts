/**
 * Feature flags for progressive rollout of new functionality.
 *
 * To disable the chatbot entirely (e.g. while it's still being wired up),
 * set `chatbot.enabled` to `false`. The ChatbotWidget component respects
 * this flag and will render nothing when disabled.
 *
 * You can also set NEXT_PUBLIC_CHATBOT_ENABLED=false in your .env to override
 * at build time without editing this file.
 */

const envFlag = (key: string, fallback: boolean): boolean => {
  const raw = process.env[key];
  if (raw === undefined) return fallback;
  return raw.toLowerCase() === 'true' || raw === '1';
};

/**
 * Parses a flag whose value has already been read.
 *
 * Next.js replaces `process.env.NEXT_PUBLIC_X` in client bundles only when the
 * reference is written out statically. `envFlag` indexes with a variable, which
 * the compiler can't see through — so in the browser it always returns the
 * fallback, whatever the .env file says. Server-side it works fine, which makes
 * the difference easy to miss.
 *
 * Flags the client genuinely needs are read statically and passed through here.
 */
const parseFlag = (raw: string | undefined, fallback: boolean): boolean => {
  if (raw === undefined) return fallback;
  return raw.toLowerCase() === 'true' || raw === '1';
};

export const features = {
  chatbot: {
    // Master switch for the AI chatbot widget.
    // Set to `true` once the Anthropic API integration is complete.
    enabled: envFlag('NEXT_PUBLIC_CHATBOT_ENABLED', false),

    // Greeting shown when the chat panel first opens.
    greeting:
      "Hi! I'm the Aware in Medicine assistant. Ask me about any condition we've covered, or how to navigate the site.",

    // Placeholder text in the input field.
    inputPlaceholder: 'Ask about a condition…',
  },

  semanticSearch: {
    // Master switch for AI search on the Conditions Library.
    //
    // Defaults to true because the feature degrades safely: with the flag on but
    // OPENAI_API_KEY or the Supabase vars missing, /api/search returns 503 and
    // the explorer falls back to plain name matching. Nothing user-visible
    // breaks — the search box just gets less clever.
    // Read statically (not via envFlag) so the value survives into the client
    // bundle — the search hook checks it before making a request.
    enabled: parseFlag(process.env.NEXT_PUBLIC_SEMANTIC_SEARCH_ENABLED, true),

    // Milliseconds of quiet typing before a query is sent. Every request is a
    // paid embedding call, so this is a cost lever as well as a UX one.
    debounceMs: 350,

    // Matches searchSchema's minimum in lib/validation.ts. Below this the client
    // doesn't bother asking.
    minQueryLength: 3,

    // How many results to request per search.
    maxResults: 12,
  },
} as const;

export type Features = typeof features;
