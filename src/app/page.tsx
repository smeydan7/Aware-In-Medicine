import { Hero } from '@/components/home/Hero';
import { MissionSection } from '@/components/home/MissionSection';
import { ArticlesPreview } from '@/components/home/ArticlesPreview';
import { WhatWeDoSection } from '@/components/home/WhatWeDoSection';
import { FeaturedConditions } from '@/components/home/FeaturedConditions';
import { CTASection } from '@/components/home/CTASection';
import { sortedArticles } from '@/data/articles';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionSection />
      <ArticlesPreview articles={sortedArticles.slice(0, 6)} />
      <WhatWeDoSection />
      <FeaturedConditions />
      <CTASection />
    </>
  );
}
