import { getServiceClient } from "./supabase/service";
import type { Mine } from "./types";

export async function listMines(): Promise<Mine[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("mines")
    .select("id, name, operator, commodities, country, region, latitude, longitude, status, notes, external_refs")
    .order("name", { ascending: true });
  if (error) throw new Error(`listMines failed: ${error.message}`);
  return (data ?? []) as Mine[];
}
