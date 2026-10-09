import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

// Initialize only when a data operation is requested. The marketing page and
// contact fallback can render even when a local preview has no backend config.
export const supabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    if (!client) {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (!url || !key) {
        throw new Error('Este contenido no está disponible en este momento. Escríbenos a founder@smartcoderlabs.com.');
      }
      client = createClient(url, key);
    }
    const value = Reflect.get(client, property);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
