import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only service-role client. Never import this from client components.
// Used for SSR data reads + write-heavy API routes (ingestion, classification).
let _client: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars not set (URL / SERVICE_ROLE_KEY)");
  }
  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}
