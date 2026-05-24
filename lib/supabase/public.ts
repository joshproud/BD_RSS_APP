import { createClient } from "@supabase/supabase-js";

// Simple anon client for unauthenticated SSR reads (no cookies). Safe because
// this is a personal tool with RLS disabled — data is intended to be readable.
let _client: ReturnType<typeof createClient> | null = null;

export function getPublicSupabase() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Supabase env vars not set (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)");
  }
  _client = createClient(url, anon, {
    auth: { persistSession: false },
  });
  return _client;
}
