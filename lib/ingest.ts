import Parser from "rss-parser";
import { getServiceClient } from "./supabase/service";

type FeedSourceRow = {
  id: string;
  name: string;
  url: string;
  source_type: string;
  enabled: boolean;
};

type IngestResult = {
  source: string;
  ok: boolean;
  inserted?: number;
  total?: number;
  error?: string;
  ms: number;
};

const parser = new Parser({
  timeout: 15000,
  headers: {
    // A browser-shaped UA — many sites (Cloudflare, WordPress with anti-bot, etc.)
    // 403 generic bot UAs. Identifying as a real browser unblocks most feeds.
    "User-Agent":
      "Mozilla/5.0 (compatible; MineBDRadarBot/0.1; +https://bd-rss-app.vercel.app)",
    Accept: "application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8",
  },
});

type ParsedRow = {
  source_id: string;
  external_id: string | null;
  url: string;
  title: string;
  summary: string | null;
  content: string | null;
  author: string | null;
  published_at: string | null;
  raw: Record<string, unknown>;
  status: "pending";
};

async function ingestSource(source: FeedSourceRow): Promise<IngestResult> {
  const start = Date.now();
  const sb = getServiceClient();

  try {
    const feed = await parser.parseURL(source.url);

    const rows: ParsedRow[] = feed.items
      .map((item) => {
        const url = item.link ?? "";
        if (!url) return null;
        return {
          source_id: source.id,
          external_id: (item.guid as string | undefined) ?? item.link ?? null,
          url,
          title: item.title ?? "(no title)",
          summary: item.contentSnippet ?? null,
          content: item.content ?? null,
          author:
            (item.creator as string | undefined) ??
            (item.author as string | undefined) ??
            null,
          published_at: item.isoDate
            ? new Date(item.isoDate).toISOString()
            : null,
          raw: item as unknown as Record<string, unknown>,
          status: "pending" as const,
        };
      })
      .filter((r): r is ParsedRow => r !== null);

    // Dedupe: look up which (source_id, external_id) and (source_id, url) already
    // exist, then insert only the new ones. Avoids depending on partial unique
    // indexes for ON CONFLICT.
    const externalIds = rows
      .map((r) => r.external_id)
      .filter((id): id is string => !!id);
    const urls = rows.map((r) => r.url);

    const [existingByIdRes, existingByUrlRes] = await Promise.all([
      externalIds.length > 0
        ? sb
            .from("articles")
            .select("external_id")
            .eq("source_id", source.id)
            .in("external_id", externalIds)
        : Promise.resolve({ data: [] as { external_id: string | null }[], error: null }),
      urls.length > 0
        ? sb
            .from("articles")
            .select("url")
            .eq("source_id", source.id)
            .in("url", urls)
        : Promise.resolve({ data: [] as { url: string }[], error: null }),
    ]);

    if (existingByIdRes.error) throw new Error(`existing by id: ${existingByIdRes.error.message}`);
    if (existingByUrlRes.error) throw new Error(`existing by url: ${existingByUrlRes.error.message}`);

    const seenIds = new Set(
      (existingByIdRes.data ?? [])
        .map((r) => r.external_id as string | null)
        .filter((v): v is string => !!v),
    );
    const seenUrls = new Set((existingByUrlRes.data ?? []).map((r) => r.url as string));

    const toInsert = rows.filter((r) => {
      if (r.external_id && seenIds.has(r.external_id)) return false;
      if (seenUrls.has(r.url)) return false;
      return true;
    });

    let inserted = 0;
    if (toInsert.length > 0) {
      const { data, error } = await sb
        .from("articles")
        .insert(toInsert)
        .select("id");
      if (error) throw new Error(`insert: ${error.message}`);
      inserted = data?.length ?? 0;
    }

    const ms = Date.now() - start;
    await sb
      .from("feed_sources")
      .update({
        last_pulled_at: new Date().toISOString(),
        last_pulled_status: `ok: ${inserted} new of ${rows.length} items (${ms}ms)`,
      })
      .eq("id", source.id);

    return { source: source.name, ok: true, inserted, total: rows.length, ms };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const ms = Date.now() - start;
    await sb
      .from("feed_sources")
      .update({
        last_pulled_at: new Date().toISOString(),
        last_pulled_status: `error: ${message.slice(0, 240)}`,
      })
      .eq("id", source.id);
    return { source: source.name, ok: false, error: message, ms };
  }
}

export async function ingestAllFeeds() {
  const sb = getServiceClient();
  const { data: sources, error } = await sb
    .from("feed_sources")
    .select("id, name, url, source_type, enabled")
    .eq("enabled", true);
  if (error) throw new Error(`load feed_sources: ${error.message}`);

  const list = (sources ?? []) as FeedSourceRow[];

  // 5-way concurrency to keep within Vercel function CPU/memory.
  const results: IngestResult[] = [];
  const queue = [...list];
  const workers = Array.from(
    { length: Math.min(5, queue.length) },
    async () => {
      while (queue.length > 0) {
        const next = queue.shift();
        if (!next) break;
        results.push(await ingestSource(next));
      }
    },
  );
  await Promise.all(workers);

  return {
    ran_at: new Date().toISOString(),
    sources: results.length,
    ok: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    details: results,
  };
}
