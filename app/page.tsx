import { WorldMap } from "@/components/Map";
import { listMines } from "@/lib/mines";

export const dynamic = "force-dynamic"; // Always fetch fresh mines for now.

export default async function Home() {
  let mines: Awaited<ReturnType<typeof listMines>> = [];
  let error: string | null = null;
  try {
    mines = await listMines();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error loading mines";
  }

  return (
    <div className="w-full h-full relative">
      <WorldMap mines={mines} />
      {error && (
        <div className="absolute top-4 left-4 bg-amber-950 border border-amber-700 text-amber-100 text-sm px-3 py-2 rounded shadow-lg max-w-md">
          <div className="font-medium mb-1">Supabase not connected</div>
          <div className="text-xs text-amber-200/80">{error}</div>
          <div className="text-xs text-amber-300 mt-1">
            Set NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY in .env.local and restart dev.
          </div>
        </div>
      )}
      {!error && (
        <div className="absolute bottom-4 left-4 bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded backdrop-blur">
          {mines.length} mines
        </div>
      )}
    </div>
  );
}
