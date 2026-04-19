# Aware in Medicine

A warm, accessible redesign of the Aware in Medicine nonprofit website — making medical knowledge accessible for all.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Designed to scale from a static content site to an AI-assisted learning hub.

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 14 (App Router) | Server Components, streaming, API routes, file-based routing, first-class TypeScript |
| Language | TypeScript (strict) | Type-safe data layer — `Condition`, `LearnTopic`, `ChatMessage` are typed end to end |
| Styling | Tailwind CSS | Design-token config in `tailwind.config.ts`, zero CSS file sprawl |
| Animation | Framer Motion | Entrance animations on hero + accordion transitions |
| Icons | lucide-react | Tree-shakable, consistent stroke weight |
| Validation | Zod | Single schema shared between client form and API route |
| AI (staged) | `@anthropic-ai/sdk` | Installed and wired; flip one flag to go live |
| Fonts | `next/font/google` | Self-hosted Fraunces (serif) + Inter (sans), zero layout shift |

---

## Architecture

```
src/
├── app/                       # Routes (App Router)
│   ├── api/
│   │   ├── chat/route.ts      # Chatbot endpoint (Anthropic SDK stub)
│   │   └── suggestions/route.ts  # Form submissions (Zod-validated)
│   ├── conditions/page.tsx    # Conditions Library (search + filter)
│   ├── learn/page.tsx         # Learn the Basics (accordion)
│   ├── weekly-updates/page.tsx # Timeline
│   ├── suggest/page.tsx       # Suggestion form (replaces Google Form)
│   ├── layout.tsx             # Root layout + fonts + nav + footer + chatbot
│   ├── page.tsx               # Homepage
│   └── globals.css
├── components/
│   ├── layout/                # Header, Footer
│   ├── ui/                    # Button, Badge, Container, ImagePlaceholder
│   ├── home/                  # Hero, MissionSection, WhatWeDoSection, etc.
│   ├── conditions/            # ConditionCard, ConditionsExplorer
│   ├── learn/                 # LearnAccordion
│   ├── suggest/               # SuggestionForm
│   └── chatbot/               # ChatbotWidget (feature-flag gated)
├── config/
│   ├── site.ts                # Org metadata (single source of truth)
│   ├── features.ts            # Feature flags (chatbot on/off)
│   └── navigation.ts          # Nav links (header + footer read from here)
├── data/
│   ├── conditions.ts          # 62 conditions, typed + categorized
│   └── learn-topics.ts        # Educational content
├── lib/
│   ├── utils.ts               # cn() className merger, slugify
│   ├── validation.ts          # Zod schemas (shared client + server)
│   └── chatbot-context.ts     # Builds chatbot system prompt from site data
└── types/
    └── index.ts               # Shared TypeScript types
```

**Key design principles:**

1. **One source of truth per concern.** Nav links live in `config/navigation.ts` only. Org info in `config/site.ts` only. Conditions data in `data/conditions.ts` only. Change once, updates everywhere.
2. **Server by default, client only where needed.** Pages are Server Components. Only interactive pieces (`Header`, `ConditionsExplorer`, `LearnAccordion`, `SuggestionForm`, `ChatbotWidget`) are `'use client'`.
3. **The chatbot reads site data directly.** `lib/chatbot-context.ts` imports from `data/conditions.ts` and `data/learn-topics.ts`, so the bot's knowledge auto-updates when content is added.
4. **Validation lives in one place.** `lib/validation.ts` exports a Zod schema used by both the client form and the API route — they can't drift.
5. **Feature flags for progressive rollout.** The chatbot is disabled via `features.chatbot.enabled` until it's ready to ship.

---

## Getting started

```bash
npm install
cp .env.example .env.local    # optional — only needed to enable the chatbot
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Enabling the chatbot

1. Set `NEXT_PUBLIC_CHATBOT_ENABLED=true` in `.env.local`.
2. Add your Anthropic API key: `ANTHROPIC_API_KEY=sk-ant-...`.
3. In `src/app/api/chat/route.ts`, move the `import Anthropic from '@anthropic-ai/sdk'` to the top of the file and uncomment the "LIVE PATH" block.

That's it — the system prompt is already assembled from your site's content via `buildChatbotSystemPrompt()`, so the bot will know every condition and learn topic without any extra configuration.

To disable again at any time: set the flag back to `false`. `<ChatbotWidget />` will render `null` and the API route will return 503.

---

## Accessibility

- Semantic HTML throughout (`<article>`, `<nav>`, `<section>`, `<ol>`)
- Skip-to-content link
- `aria-expanded` / `aria-controls` on all accordions and menus
- `aria-live` regions for dynamic content (search results, chat messages)
- Visible focus rings using `focus-visible`
- Keyboard-navigable mobile menu
- Color contrast ratios meet WCAG AA against the cream background

---

## Content attribution

Condition data (62 weekly entries) is sourced from the original Aware in Medicine Google Sites export. "Learn the Basics" prose was expanded for better on-site reading. Replace `ImagePlaceholder` components with real imagery as assets become available.

---

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm start            # Start production server
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```
