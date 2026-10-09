import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Created on first use rather than at module load. The contact form is the only
 * consumer, so a build-time render (or a missing env var) must not take the
 * whole bundle down before anything renders.
 */
export function getSupabaseClient(): SupabaseClient {
  if (client) return client;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required to submit the contact form.');
  client = createClient(url, anonKey);
  return client;
}
