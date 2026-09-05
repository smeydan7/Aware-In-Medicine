/**
 * scripts/embed-conditions.ts
 *
 * One-shot ingest job: turns every enriched condition into an embedding vector
 * and upserts it into the `conditions_embeddings` table in Supabase.
 *
 * Run with:
 *   npm run embed
 *
 * Safe to run repeatedly. Rows are upserted on `slug`, so re-running after
 * adding a new condition only costs the embeddings for what changed shape,
 * and never duplicates. Conditions removed from the source data are deleted
 * from the table so they stop appearing in search results.
 *
 * Requires (in .env.local — see .env.example):
 *   OPENAI_API_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   ← write access, server-only, never in the browser
 */

import 'dotenv/config';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { enrichedConditions as conditions } from '@/data/conditions-enriched';
import type { EnrichedCondition } from '@/types/enriched';
import { EMBEDDING_MODEL } from '@/lib/embeddings';

/**
 * Fail fast with a readable message rather than letting a missing key surface
 * as a confusing 401 halfway through a batch.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(
      `Missing required environment variable: ${name}\n` +
        `Add it to .env.local (see .env.example for the full list).`
    );
    process.exit(1);
  }
  return value;
}

const openai = new OpenAI({ apiKey: requireEnv('OPENAI_API_KEY') });

// The service role key bypasses RLS. It is only ever used here, in a script
// that runs on your machine — never inside a route handler or a component.
const supabase = createClient(
  requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  requireEnv('SUPABASE_SERVICE_ROLE_KEY')
);

/**
 * Determines what text gets embedded for each condition.
 *
 * The quality of this string is the ceiling on search quality: a user's query
 * is only ever matched against this, never against the raw data. Symptoms and
 * commonly-confused-with entries matter most, since those are what people
 * actually type when they don't know the name of the thing they have.
 */
function buildEmbedText(condition: EnrichedCondition): string {
  const parts = [
    `${condition.name}${condition.fullName ? ` (${condition.fullName})` : ''}`,
    `Category: ${condition.category}`,
    `Summary: ${condition.summary}`,
    `Symptoms: ${condition.symptoms.join(', ')}`,
    `Causes: ${condition.causes.join(', ')}`,
    `Treatments: ${condition.treatments.join(', ')}`,
    `Affected areas: ${condition.affectedAreas.join(', ')}`,
    `Related conditions: ${condition.relatedConditions.join(', ')}`,
  ];
  if (condition.commonlyConfusedWith?.length) {
    parts.push(
      `Sometimes confused with: ${condition.commonlyConfusedWith.join(', ')}`
    );
  }
  return parts.join('\n');
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL, // 1536 dims, ~$0.02/1M tokens
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}

/**
 * Removes rows whose slug no longer exists in the source data, so a condition
 * deleted from conditions.ts also disappears from search.
 */
async function pruneStaleRows(liveSlugs: string[]): Promise<void> {
  const { data, error } = await supabase
    .from('conditions_embeddings')
    .select('slug');

  if (error) {
    console.error('Supabase read error while pruning:', error.message);
    process.exit(1);
  }

  const stale = (data ?? [])
    .map((row) => row.slug as string)
    .filter((slug) => !liveSlugs.includes(slug));

  if (stale.length === 0) return;

  const { error: deleteError } = await supabase
    .from('conditions_embeddings')
    .delete()
    .in('slug', stale);

  if (deleteError) {
    console.error('Supabase delete error while pruning:', deleteError.message);
    process.exit(1);
  }

  console.log(`  Pruned ${stale.length} stale row(s): ${stale.join(', ')}`);
}

async function main() {
  if (conditions.length === 0) {
    console.error(
      'No enriched conditions found. Check that conditions-enriched.json ' +
        'has entries whose slugs match conditions.ts.'
    );
    process.exit(1);
  }

  console.log(`Embedding ${conditions.length} conditions...`);

  // Batches of 20 keep each request well inside the token limit and stay
  // comfortably under the embeddings rate limit.
  const BATCH_SIZE = 20;
  const rows = [];

  for (let i = 0; i < conditions.length; i += BATCH_SIZE) {
    const batch = conditions.slice(i, i + BATCH_SIZE);
    const texts = batch.map(buildEmbedText);
    const embeddings = await embedBatch(texts);

    for (let j = 0; j < batch.length; j++) {
      const c = batch[j];
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
      });
    }
    console.log(
      `  Embedded ${Math.min(i + BATCH_SIZE, conditions.length)}/${conditions.length}`
    );
  }

  const { error } = await supabase
    .from('conditions_embeddings')
    .upsert(rows, { onConflict: 'slug' });

  if (error) {
    console.error('Supabase upsert error:', error.message);
    process.exit(1);
  }

  await pruneStaleRows(rows.map((r) => r.slug));

  console.log(`Done. ${rows.length} conditions embedded and stored.`);
}

main().catch((err) => {
  console.error('Unexpected failure:', err);
  process.exit(1);
});
