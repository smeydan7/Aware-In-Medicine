import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client factories.
 *
 * Two clients with deliberately different powers:
 *
 *   getServerClient()  — anon key. Subject to RLS. Used by route handlers.
 *                        Can call match_conditions(), cannot read the table.
 *
 *   getServiceClient() — service role key. Bypasses RLS entirely. Used ONLY by
 *                        scripts/embed-conditions.ts, which runs on your own
 *                        machine. Never import this from a component or a route
 *                        handler: the key it reads is not NEXT_PUBLIC_, so
 *                        doing so would fail in the browser anyway, but the
 *                        real reason is that nothing served to a user should
 *                        ever hold RLS-bypassing credentials.
 */

let serverClient: SupabaseClient | null = null;

/** True when Supabase is configured well enough to run a search. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Anon-key client for use inside route handlers.
 *
 * Lazily constructed so that importing this module during a build with no env
 * vars present doesn't throw.
 */
export function getServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and ' +
        'NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.'
    );
  }

  serverClient ??= createClient(url, anonKey, {
    auth: { persistSession: false },
  });

  return serverClient;
}
