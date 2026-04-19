import { Hero } from '@/components/home/Hero';
import { MissionSection } from '@/components/home/MissionSection';
import { WhatWeDoSection } from '@/components/home/WhatWeDoSection';
import { FeaturedConditions } from '@/components/home/FeaturedConditions';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionSection />
      <WhatWeDoSection />
      <FeaturedConditions />
      <CTASection />
    </>
  );
}
