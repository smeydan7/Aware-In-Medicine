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
} as const;

export type Features = typeof features;
