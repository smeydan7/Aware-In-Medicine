'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { features } from '@/config/features';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/types';

/**
 * Floating chatbot widget.
 *
 * Behavior:
 *   - Returns `null` when `features.chatbot.enabled` is false, so disabling
 *     the bot is a one-line config change.
 *   - All bot "knowledge" (conditions list, learn topics, disclaimer) is
 *     assembled server-side in /api/chat via buildChatbotSystemPrompt().
 *     The client component is purely presentational.
 *   - State is local: no context provider or global store needed.
 */
export function ChatbotWidget() {
  if (!features.chatbot.enabled) return null;
  return <ChatbotWidgetInner />;
}

function ChatbotWidgetInner() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: features.chatbot.greeting,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  // Focus the input when the panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      const replyText: string =
        data?.reply ?? data?.error ?? 'Sorry, something went wrong.';

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: replyText,
          timestamp: Date.now(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Network error — please try again in a moment.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        aria-expanded={open}
        aria-controls="chatbot-panel"
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lift flex items-center justify-center transition-all duration-200',
          'bg-clay-400 text-cream-50 hover:bg-clay-500 hover:scale-105',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100'
        )}
      >
        {open ? (
          <X className="w-5 h-5" aria-hidden />
        ) : (
          <MessageCircle className="w-5 h-5" aria-hidden />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          id="chatbot-panel"
          role="dialog"
          aria-label="Aware in Medicine assistant"
          className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-[22rem] z-50 h-[32rem] max-h-[calc(100vh-8rem)] rounded-3xl bg-cream-50 border border-cream-300 shadow-lift flex flex-col overflow-hidden animate-fade-in-up"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-cream-200 bg-cream-100">
            <p className="font-serif text-lg text-ink leading-tight">
              Aware assistant
            </p>
            <p className="text-xs text-ink-muted mt-0.5">
              Educational info only. This is not medical advice.
            </p>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'flex',
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap',
                    m.role === 'user'
                      ? 'bg-clay-400 text-cream-50 rounded-br-sm'
                      : 'bg-cream-200 text-ink rounded-bl-sm'
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-2xl bg-cream-200 text-ink-muted">
                  <Loader2 className="w-4 h-4 animate-spin" aria-label="Thinking" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-cream-200 flex gap-2 bg-cream-50"
          >
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={features.chatbot.inputPlaceholder}
              disabled={sending}
              autoComplete="off"
              className="flex-1 h-10 px-4 rounded-full bg-cream-100 border border-cream-300 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-clay-300 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="shrink-0 w-10 h-10 rounded-full bg-clay-400 text-cream-50 hover:bg-clay-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" aria-hidden />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
