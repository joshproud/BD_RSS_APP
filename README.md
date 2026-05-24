# Mine BD Radar

Personal BD intelligence tool — world map of major mine sites + AI-classified RSS feed flagging engineering opportunities (capex, FID, expansion, outage, tender) for EMtek's mining clients.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- MapLibre GL JS via `react-map-gl` (OpenFreeMap basemap, no API key)
- Supabase (Postgres) for storage
- Claude API (Anthropic SDK) for opportunity classification
- Vercel hosting + Vercel Cron for scheduled ingestion

## Setup

1. Install deps: `npm install`
2. Create a Supabase project at https://supabase.com and run `supabase/schema.sql` in the SQL editor.
3. Copy `.env.local.example` to `.env.local` and fill in values:
   - Supabase URL + anon key + service role key (from Project Settings → API)
   - Anthropic API key (from console.anthropic.com)
4. Run dev: `npm run dev` → open http://localhost:3000

## Scope (MVP)

- ~50 flagship mines (AU iron ore + coal + gold + copper, Indonesia, PNG, Chile/Peru copper, Brazil iron ore)
- ~10 RSS sources (mining.com, MiningWeekly, Australian Mining, ASX announcements per major operator, Kitco, Reuters)
- Daily ingestion → triage → opportunity classification
- World map with mine pins coloured by commodity; click → mine details + related news
- Inbox-style feed view with filters

## Folder layout

```
app/              Next.js App Router pages and API routes
components/       React components (Map, Nav, etc.)
lib/              Supabase clients, env loading, shared helpers
supabase/         SQL schema and seed data
public/           Static assets
```
