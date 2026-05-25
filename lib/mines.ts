import { createClient } from "@supabase/supabase-js";
import type { Mine } from "./types";

// SSR data fetch. We use the service role key (server-only, never sent to the
// browser) because the new sb_publishable_* keys don't grant the anon role
// SELECT on user tables — even with RLS disabled — and we have no need for
// client-side queries yet.
function getServerReadClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars not set (URL / SERVICE_ROLE_KEY)");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function listMines(): Promise<Mine[]> {
  const sb = getServerReadClient();
  const { data, error } = await sb
    .from("mines")
    .select("id, name, operator, commodities, country, region, latitude, longitude, status, notes, external_refs")
    .order("name", { ascending: true });
  if (error) throw new Error(`listMines failed: ${error.message}`);
  return (data ?? []) as Mine[];
}
