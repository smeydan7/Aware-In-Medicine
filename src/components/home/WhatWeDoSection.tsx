import { BookOpen, Video, Library, Lightbulb } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const pillars = [
  {
    icon: Video,
    title: 'Weekly condition explainers',
    body: 'Short, research-backed videos on TikTok breaking down a new condition every week! Symptoms, causes, and treatments in plain language.',
  },
  {
    icon: BookOpen,
    title: 'Simplified summaries',
    body: 'Each topic gets a readable written summary, so you can skim a page instead of scrubbing through a video when that works better for you.',
  },
  {
    icon: Library,
    title: 'A growing archive',
    body: 'Every condition we cover lives in a searchable library. Bookmark it, share it with family, come back when you need it.',
  },
  {
    icon: Lightbulb,
    title: 'Curiosity, encouraged',
    body: "Medicine is fascinating when it's explained well. We aim to make you want to learn more, not less.",
  },
];

export function WhatWeDoSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">What we do</p>
          <h2 className="font-serif text-display-lg text-balance text-ink">
            Four things, done well.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group p-6 md:p-7 rounded-3xl bg-cream-50 border border-cream-200 hover:border-clay-200 hover:shadow-soft transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-2xl bg-clay-50 text-clay-500 flex items-center justify-center group-hover:bg-clay-100 transition-colors">
                <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-5 font-serif text-xl text-ink leading-snug">
                {title}
              </h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                {body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
