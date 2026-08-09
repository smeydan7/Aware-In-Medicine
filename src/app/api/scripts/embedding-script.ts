// scripts/embed-conditions.ts
// Run with: npx ts-node scripts/embed-conditions.ts
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import { enrichedConditions as conditions } from "@/data/conditions-enriched"
import type { EnrichedCondition } from "@/types/enriched"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for write access
)

// This function determines what text gets embedded for each condition.
// Quality of this text = quality of your search. Be thorough.
function buildEmbedText(condition: EnrichedCondition): string {
  const parts = [
    `${condition.name}${condition.fullName ? ` (${condition.fullName})` : ""}`,
    `Category: ${condition.category}`,
    `Summary: ${condition.summary}`,
    `Symptoms: ${condition.symptoms.join(", ")}`,
    `Causes: ${condition.causes.join(", ")}`,
    `Treatments: ${condition.treatments.join(", ")}`,
    `Affected areas: ${condition.affectedAreas.join(", ")}`,
    `Related conditions: ${condition.relatedConditions.join(", ")}`,
  ]
  if (condition.commonlyConfusedWith?.length) {
    parts.push(`Sometimes confused with: ${condition.commonlyConfusedWith.join(", ")}`)
  }
  return parts.join("\n")
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small", // 1536 dims, $0.02/1M tokens — very cheap
    input: texts,
  })
  return response.data.map((d) => d.embedding)
}

async function main() {
  console.log(`Embedding ${conditions.length} conditions...`)

  // Process in batches of 20 to avoid rate limits
  const BATCH_SIZE = 20
  const rows = []

  for (let i = 0; i < conditions.length; i += BATCH_SIZE) {
    const batch = conditions.slice(i, i + BATCH_SIZE)
    const texts = batch.map(buildEmbedText)
    const embeddings = await embedBatch(texts)

    for (let j = 0; j < batch.length; j++) {
      const c = batch[j]
      rows.push({
        slug: c.slug,
        name: c.name,
        alias: c.fullName || null,
        category: c.category,
        week: c.week,
        tiktok_url: c.tiktokUrl,
        embed_text: texts[j],
        embedding: embeddings[j],
        metadata: {
          summary: c.summary,
          symptoms: c.symptoms,
          causes: c.causes,
          treatments: c.treatments,
          relatedConditions: c.relatedConditions,
          affectedAreas: c.affectedAreas,
          commonlyConfusedWith: c.commonlyConfusedWith,
        },
      })
    }
    console.log(`  Embedded ${Math.min(i + BATCH_SIZE, conditions.length)}/${conditions.length}`)
  }

  // Upsert — safe to run multiple times (won't duplicate)
  const { error } = await supabase
    .from("conditions_embeddings")
    .upsert(rows, { onConflict: "slug" })

  if (error) {
    console.error("Supabase upsert error:", error)
    process.exit(1)
  }

  console.log(`Done. ${rows.length} conditions embedded and stored.`)
}

main()