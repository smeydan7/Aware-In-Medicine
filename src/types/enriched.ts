import type { Condition } from '@/types'

export type EnrichedCondition = Condition & {
  summary: string
  symptoms: string[]
  causes: string[]
  treatments: string[]
  affectedAreas: string[]
  relatedConditions: string[]
  commonlyConfusedWith: string[]
}

/** Shape of each entry in conditions-enriched.json (enrichment fields only). */
export type EnrichedConditionData = Pick<
  EnrichedCondition,
  | 'slug'
  | 'summary'
  | 'symptoms'
  | 'causes'
  | 'treatments'
  | 'affectedAreas'
  | 'relatedConditions'
  | 'commonlyConfusedWith'
>