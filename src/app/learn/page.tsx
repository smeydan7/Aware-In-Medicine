import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { LearnAccordion } from '@/components/learn/LearnAccordion';
import { learnTopics } from '@/data/learn-topics';

export const metadata: Metadata = {
  title: 'Learn the Basics',
  description:
    'Practical healthcare literacy — how to prepare for appointments, understand terminology, evaluate health information, and more.',
};

export default function LearnPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <Container>
          <p className="eyebrow mb-5">Learn the basics</p>
          <h1 className="font-serif text-display-lg text-balance text-ink max-w-3xl">
            Understanding health conditions is only one part of navigating
            healthcare.
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-2xl leading-relaxed">
            Basic medical knowledge, helpful tips, and practical guidance to
            help you communicate with providers and make informed decisions
            during medical visits.
          </p>
        </Container>
      </section>

      {/* Featured block: Why Health Literacy Matters */}
      <section className="pb-6">
        <Container>
          <div className="p-8 md:p-12 rounded-3xl bg-sage-50 border border-sage-100">
            <p className="eyebrow !text-sage-700 mb-4">The idea behind it all</p>
            <h2 className="font-serif text-display-md text-ink text-balance max-w-2xl">
              Why does health literacy matter?
            </h2>
            <p className="mt-5 text-ink-soft max-w-prose leading-relaxed">
              Health literacy is the ability to find, understand, and use
              health information to make informed decisions about care. Higher
              health literacy is linked to better management of chronic
              conditions, more effective conversations with providers, and
              fewer hospital readmissions. It's the single skill that makes
              almost every interaction with the healthcare system easier.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-2xl text-ink">
              <li className="flex gap-2">
                <span className="text-sage-500 shrink-0">✓</span>
                Understand medical conditions
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500 shrink-0">✓</span>
                Follow treatment plans correctly
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500 shrink-0">✓</span>
                Communicate with providers
              </li>
              <li className="flex gap-2">
                <span className="text-sage-500 shrink-0">✓</span>
                Recognize when to seek care
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Topic accordion */}
      <section className="py-14 md:py-20">
        <Container>
          <h2 className="sr-only">Topics</h2>
          <LearnAccordion topics={learnTopics} />
        </Container>
      </section>

      {/* Closing nudge */}
      <section className="pb-24">
        <Container size="narrow">
          <div className="text-center">
            <p className="text-ink-soft">Ready to go deeper?</p>
            <Link
              href="/conditions"
              className="mt-3 inline-flex items-center gap-2 font-serif text-2xl text-ink hover:text-clay-500 transition-colors"
            >
              Explore the Conditions Library
              <ArrowRight className="w-5 h-5" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
