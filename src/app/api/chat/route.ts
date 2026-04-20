import { NextResponse } from 'next/server';
import { features } from '@/config/features';
import { buildChatbotSystemPrompt } from '@/lib/chatbot-context';

/**
 * POST /api/chat
 *
 * Chatbot endpoint. Currently returns a canned response when the feature
 * flag is off or the ANTHROPIC_API_KEY is missing.
 *
 * TO GO LIVE:
 *   1. Set NEXT_PUBLIC_CHATBOT_ENABLED=true in .env.local
 *   2. Set ANTHROPIC_API_KEY=sk-ant-… in .env.local (server-only, never expose)
 *   3. Uncomment the "live path" block below
 *
 * The Anthropic SDK is already installed (@anthropic-ai/sdk) so no npm
 * install is needed to switch over.
 */

export const runtime = 'nodejs'; // SDK needs Node runtime, not Edge

type IncomingMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(req: Request) {
  if (!features.chatbot.enabled) {
    return NextResponse.json(
      { error: 'Chatbot is currently disabled.' },
      { status: 503 }
    );
  }

  let body: { messages?: IncomingMessage[] } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json(
      { error: 'Provide a `messages` array.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ── STUB PATH ──────────────────────────────────────────────────────────
  // Without an API key, return a canned response so the UI can be demoed.
  if (!apiKey) {
    const lastUserMsg =
      messages.filter((m) => m.role === 'user').at(-1)?.content ?? '';
    return NextResponse.json({
      reply: `(Demo mode: AI API key not configured.) You asked: "${lastUserMsg.slice(
        0,
        120
      )}". Once wired up, I'll answer using the Aware in Medicine content library.`,
    });
  }

  // ── LIVE PATH ──────────────────────────────────────────────────────────
  // Uncomment this block when you're ready to flip the switch.
  //
  // import Anthropic from '@anthropic-ai/sdk';  // move to top of file
  //
  // const client = new Anthropic({ apiKey });
  // const response = await client.messages.create({
  //   model: 'claude-sonnet-4-20250514',
  //   max_tokens: 800,
  //   system: buildChatbotSystemPrompt(),
  //   messages: messages.map((m) => ({ role: m.role, content: m.content })),
  // });
  //
  // const text = response.content
  //   .filter((block) => block.type === 'text')
  //   .map((block) => ('text' in block ? block.text : ''))
  //   .join('\n');
  //
  // return NextResponse.json({ reply: text });

  // While the live path is commented out, fall through to the stub:
  return NextResponse.json({
    reply:
      'Live path is commented out in /api/chat/route.ts - uncomment it to enable real responses. The system prompt is already wired to the site content via buildChatbotSystemPrompt().',
  });
}
