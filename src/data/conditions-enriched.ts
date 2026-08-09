import enrichedJson from './conditions-enriched.json';
import { conditions as baseConditions } from './conditions';
import type { EnrichedCondition, EnrichedConditionData } from '@/types/enriched';

const enrichedData: EnrichedConditionData[] = enrichedJson;

const enrichedBySlug = new Map(
  enrichedData.map((entry) => [entry.slug, entry])
);

export const enrichedConditions: EnrichedCondition[] = baseConditions.flatMap(
  (base) => {
    const enriched = enrichedBySlug.get(base.slug);
    return enriched ? [{ ...base, ...enriched }] : [];
  }
);
