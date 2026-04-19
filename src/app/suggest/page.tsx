import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SuggestionForm } from '@/components/suggest/SuggestionForm';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Suggest a Condition',
  description:
    'Suggest a medical condition or health topic for a future Aware in Medicine post.',
};

export default function SuggestPage() {
  return (
    <>
      <section className="pt-14 md:pt-20 pb-10">
        <Container size="narrow">
          <p className="eyebrow mb-5">Suggest a condition</p>
          <h1 className="font-serif text-display-lg text-balance text-ink">
            What would you like to learn about next?
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            Have a condition or health topic you'd like to see featured? Your
            ideas shape our future content and help us highlight the things
            people actually want to learn about.
          </p>
        </Container>
      </section>

      <section className="pb-20">
        <Container size="narrow">
          <div className="p-6 md:p-10 rounded-3xl bg-cream-50 border border-cream-200">
            <SuggestionForm />
          </div>

          <p className="mt-8 text-sm text-ink-muted text-center">
            Prefer to reach out directly? Email us at{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-ink underline underline-offset-4 hover:text-clay-500"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
