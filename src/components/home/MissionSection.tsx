import { Container } from '@/components/ui/Container';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function MissionSection() {
  return (
    <section className="py-20 md:py-28 bg-cream-50 border-y border-cream-200" id="about">
      <Container>
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Our mission</p>
            <h2 className="font-serif text-display-lg text-balance text-ink">
              Health information shouldn't feel like a second language.
            </h2>
            <div className="mt-8 space-y-5 text-ink-soft text-lg leading-relaxed max-w-prose">
              <p>
                Aware in Medicine is a nonprofit educational platform that turns
                complex medical conditions into clear, engaging explanations —
                the kind you'd actually share with a friend or family member.
              </p>
              <p>
                So many of us encounter health information online but struggle
                to tell reliable sources from noise. We're building a growing,
                accessible archive so that curiosity about medicine doesn't get
                lost in jargon.
              </p>
              <p className="text-ink">
                Our goal is simple: help you feel more informed about the
                conditions that affect you, and the people you love.
              </p>
            </div>
          </div>

          {/* Image slot */}
          <div className="lg:col-span-5">
            <ImagePlaceholder
              label="Founder / team photo"
              hint="A warm, human image — the team, a hand holding a stethoscope, or a clean flat-lay of notebooks and reference materials."
              aspect="aspect-[4/5]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
