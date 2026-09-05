-- ─────────────────────────────────────────────────────────────────────────────
-- 001_search.sql — semantic search setup for the Conditions Library
--
-- Run this once, top to bottom, in the Supabase SQL editor.
-- It is idempotent: safe to run again after editing.
--
-- Assumes `conditions_embeddings` already exists (see tableschema.txt).
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists vector;

-- ── 1. Drop the old index ────────────────────────────────────────────────────
-- Dropped BEFORE retyping the column so the ALTER doesn't waste time rebuilding
-- an index we're about to replace anyway.
--
-- The original index was ivfflat with lists = 8. ivfflat is an *approximate*
-- index that partitions vectors into clusters and only searches the nearest
-- few — a good trade at hundreds of thousands of rows, a bad one at 69, where
-- it can miss correct answers while saving no measurable time. A sequential
-- scan over 69 vectors is sub-millisecond.
drop index if exists public.conditions_embeddings_embedding_idx;

-- ── 2. Pin the embedding dimension ───────────────────────────────────────────
-- The original DDL declared a bare `vector` with no dimension. pgvector needs a
-- fixed dimension to build an index, and an unconstrained column silently
-- accepts vectors of the wrong size — which fails at query time, not insert
-- time, and is miserable to debug.
--
-- 1536 = the output dimension of text-embedding-3-small.
-- If this errors, the table already holds vectors of a different size: empty it
-- with `truncate public.conditions_embeddings;` and re-run `npm run embed`.
alter table public.conditions_embeddings
  alter column embedding type vector(1536);

-- ── 3. New index ─────────────────────────────────────────────────────────────
-- HNSW instead of ivfflat: it needs no training pass over existing data, stays
-- accurate at low row counts, and will still be the right choice if this table
-- grows by an order of magnitude. Cosine distance, to match the query operator.
create index if not exists conditions_embeddings_embedding_hnsw_idx
  on public.conditions_embeddings
  using hnsw (embedding vector_cosine_ops);

-- ── 4. The search function ───────────────────────────────────────────────────
-- PostgREST cannot express the `<=>` distance operator, so vector search has to
-- go through an RPC.
--
-- `security definer` means this runs with the owner's privileges, so it can
-- read the table even though RLS (below) blocks direct reads. Net effect: the
-- browser can ask "what matches this query" but can never dump the raw
-- embeddings or the whole table.
--
-- The category filter is applied INSIDE the query, before LIMIT. Filtering
-- after the fact would mean asking for 12 results, then throwing most away and
-- showing the user four — the top-K has to be K of the right category.
create or replace function public.match_conditions(
  query_embedding vector(1536),
  match_count     int   default 12,
  filter_category text  default null,
  min_similarity  float default 0.0
)
returns table (
  slug       text,
  name       text,
  alias      text,
  category   text,
  week       integer,
  tiktok_url text,
  metadata   jsonb,
  similarity float
)
language sql
stable
security definer
set search_path = public
as $$
  select
    ce.slug,
    ce.name,
    ce.alias,
    ce.category,
    ce.week,
    ce.tiktok_url,
    ce.metadata,
    1 - (ce.embedding <=> query_embedding) as similarity
  from public.conditions_embeddings ce
  where (filter_category is null or ce.category = filter_category)
    and 1 - (ce.embedding <=> query_embedding) >= min_similarity
  order by ce.embedding <=> query_embedding
  limit match_count;
$$;

-- ── 5. Lock down the table ───────────────────────────────────────────────────
-- RLS on with no SELECT policy = no direct reads for anon or authenticated.
-- Writes stay possible only via the service role key, which bypasses RLS and
-- lives solely in scripts/embed-conditions.ts.
alter table public.conditions_embeddings enable row level security;

-- ── 6. Expose only the function ──────────────────────────────────────────────
revoke all on function public.match_conditions(vector, int, text, float) from public;
grant execute on function public.match_conditions(vector, int, text, float)
  to anon, authenticated;
