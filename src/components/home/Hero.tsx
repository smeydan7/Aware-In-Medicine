'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { conditions } from '@/data/conditions';

export function Hero() {
  const totalConditions = conditions.length;

  return (
    <section className="relative pt-10 md:pt-20 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative dots — subtle nod to the existing site's pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-24 left-[8%] w-2 h-2 rounded-full bg-clay-200" />
        <div className="absolute top-48 right-[12%] w-3 h-3 rounded-full bg-sage-200" />
        <div className="absolute bottom-32 left-[18%] w-2 h-2 rounded-full bg-gold-300" />
        <div className="absolute top-72 right-[28%] w-1.5 h-1.5 rounded-full bg-clay-300" />
        <div className="absolute bottom-16 right-[8%] w-2 h-2 rounded-full bg-sage-300" />
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <div className="eyebrow mb-6">
            <Sparkles className="w-3.5 h-3.5" aria-hidden />
            <span>A nonprofit learning hub</span>
          </div>

          {/* The Grid: 
            Column 1 holds all text and buttons.
            Column 2 holds the fixed-width portrait image.
          */}
          <div className="grid gap-12 md:grid-cols-[1fr_320px] items-start"> 
            <div className="flex flex-col">
              <h1 className="font-serif text-display-xl text-balance text-ink">
                Making medical knowledge{' '}
                <em className="not-italic text-clay-500">accessible</em> for all.
              </h1>

              <p className="mt-7 text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed text-pretty">
                Each week, we break down a different condition into clear,
                research-backed explanations — so patients, students, and families
                can navigate healthcare with more confidence.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button href="/conditions" size="lg">
                  Browse the library
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Button>
                <Button href="/learn" size="lg" variant="secondary">
                  Learn the basics
                </Button>
              </div>
            </div>

            {/* Image Container: 3px white border and portrait aspect ratio */}
            <div className="relative hidden md:block h-[440px] w-[320px] overflow-hidden rounded-2xl border-[3px] border-white bg-cream-50 shadow-soft">
              <Image
                src="/profile%20picture%20(2).png"
                alt="Aware in Medicine logo"
                fill
                className="object-cover" 
                sizes="320px"
                priority
              />
            </div>
          </div>

          {/* Stat strip stays aligned with the left content flow */}
          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
            <Stat value={`${totalConditions}+`} label="Conditions covered" />
            <Stat value="Weekly" label="New content cadence" />
            <Stat value="Free" label="Always, for everyone" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-clay-200 pl-4">
      <div className="font-serif text-2xl md:text-3xl text-ink">{value}</div>
      <div className="text-xs md:text-sm text-ink-muted mt-1">{label}</div>
    </div>
  );
}