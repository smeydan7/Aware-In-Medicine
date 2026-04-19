import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MessageCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <div className="relative overflow-hidden rounded-[2rem] bg-clay-400 text-cream-50 px-8 py-14 md:px-16 md:py-20 text-center shadow-lift">
          {/* Soft decorative circles */}
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-clay-300/40 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-gold-300/30 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-50/15 mb-6">
              <MessageCircle className="w-5 h-5" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="font-serif text-display-md text-balance">
              Is there a condition you'd like us to cover next?
            </h2>
            <p className="mt-5 text-cream-100/90 max-w-xl mx-auto leading-relaxed">
              Your suggestions directly shape what we cover. Send us a topic —
              we read every submission.
            </p>
            <div className="mt-8">
              <Button
                href="/suggest"
                size="lg"
                className="bg-cream-50 text-clay-600 hover:bg-cream-100 hover:text-clay-700"
              >
                Suggest a condition
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
