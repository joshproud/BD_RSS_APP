import { getServiceClient } from "./supabase/service";

export type ArticleListItem = {
  id: string;
  url: string;
  title: string;
  summary: string | null;
  published_at: string | null;
  fetched_at: string;
  source_name: string;
};

export async function listRecentArticles(limit = 50): Promise<ArticleListItem[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("articles")
    .select("id, url, title, summary, published_at, fetched_at, source:feed_sources(name)")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("fetched_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`listRecentArticles failed: ${error.message}`);
  return (data ?? []).map((row) => {
    const source = row.source as { name?: string } | { name?: string }[] | null;
    const sourceName = Array.isArray(source)
      ? source[0]?.name ?? "Unknown"
      : source?.name ?? "Unknown";
    return {
      id: row.id as string,
      url: row.url as string,
      title: row.title as string,
      summary: (row.summary as string | null) ?? null,
      published_at: (row.published_at as string | null) ?? null,
      fetched_at: row.fetched_at as string,
      source_name: sourceName,
    };
  });
}
