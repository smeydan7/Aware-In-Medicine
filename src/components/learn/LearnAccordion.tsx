'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LearnTopic } from '@/types';

type LearnAccordionProps = {
  topics: LearnTopic[];
};

export function LearnAccordion({ topics }: LearnAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(topics[0]?.id ?? null);

  return (
    <div className="divide-y divide-cream-300 border-y border-cream-300">
      {topics.map((topic) => {
        const isOpen = openId === topic.id;
        return (
          <div key={topic.id} className="py-2">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`panel-${topic.id}`}
                id={`trigger-${topic.id}`}
                onClick={() => setOpenId(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
              >
                <div>
                  <div className="font-serif text-xl md:text-2xl text-ink group-hover:text-clay-600 transition-colors">
                    {topic.title}
                  </div>
                  {!isOpen && (
                    <p className="mt-1 text-sm text-ink-muted hidden sm:block">
                      {topic.summary}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    'shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300',
                    isOpen
                      ? 'bg-clay-400 text-cream-50 rotate-180'
                      : 'bg-cream-200 text-ink group-hover:bg-clay-100'
                  )}
                  aria-hidden
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </h3>

            <div
              id={`panel-${topic.id}`}
              role="region"
              aria-labelledby={`trigger-${topic.id}`}
              hidden={!isOpen}
              className="pb-6"
            >
              <div className="max-w-prose space-y-4 text-ink-soft leading-relaxed">
                {topic.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
