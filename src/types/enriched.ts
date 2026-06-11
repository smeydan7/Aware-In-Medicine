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