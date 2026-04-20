import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Suggest a Condition',
  description:
    'Suggest a medical condition or health topic for a future Aware in Medicine post.',
};

export default function SuggestPage() {
  const googleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSexuFqZwWlCsgb1YJjMyKV4ADbXPEthEDcgArvrk4qKYIINfw/viewform?pli=1';

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
          <div className="p-6 md:p-10 rounded-3xl bg-cream-50 border border-cream-200 text-center">
            <p className="text-ink-soft text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Submit your suggestion through our Google Form and help shape
              upcoming Aware in Medicine topics.
            </p>
            <Button
              href={googleFormUrl}
              target="_blank"
              rel="noreferrer"
              size="lg"
              className="mt-8"
            >
              Open Condition Suggestion Form
              <ExternalLink className="w-4 h-4" aria-hidden />
            </Button>
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
