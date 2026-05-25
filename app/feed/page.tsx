import { listRecentArticles } from "@/lib/articles";
import { format, formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  let articles: Awaited<ReturnType<typeof listRecentArticles>> = [];
  let error: string | null = null;
  try {
    articles = await listRecentArticles(100);
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-xl font-semibold tracking-tight">Feed</h1>
          <span className="text-xs text-zinc-500">{articles.length} articles</span>
        </div>

        {error && (
          <div className="bg-amber-950 border border-amber-700 text-amber-100 text-sm px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {!error && articles.length === 0 && (
          <div className="text-zinc-500 text-sm border border-zinc-800 rounded px-4 py-8 text-center">
            No articles yet. Trigger an ingestion run from{" "}
            <code className="text-zinc-300">/api/cron/ingest</code> or wait for the daily cron.
          </div>
        )}

        <ul className="space-y-4">
          {articles.map((a) => (
            <li
              key={a.id}
              className="border-b border-zinc-800 pb-4 last:border-b-0"
            >
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-100 hover:text-amber-300 transition-colors font-medium leading-snug block"
              >
                {a.title}
              </a>
              <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                <span className="text-zinc-400">{a.source_name}</span>
                {a.published_at && (
                  <>
                    <span className="text-zinc-700">·</span>
                    <time
                      dateTime={a.published_at}
                      title={format(new Date(a.published_at), "PPpp")}
                    >
                      {formatDistanceToNow(new Date(a.published_at), { addSuffix: true })}
                    </time>
                  </>
                )}
              </div>
              {a.summary && (
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-3">
                  {a.summary}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
