-- Mine BD Radar schema. Run in Supabase SQL editor (Project -> SQL -> New query).

-- Mines: curated database of mine sites we care about.
create table if not exists mines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  operator text,
  commodities text[] not null,
  country text not null,
  region text,
  latitude double precision not null,
  longitude double precision not null,
  status text not null default 'operating',
  notes text,
  external_refs jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mines_country_idx on mines(country);
create index if not exists mines_commodities_gin on mines using gin(commodities);

-- Feed sources: RSS/Atom feeds we ingest from.
create table if not exists feed_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null unique,
  source_type text not null default 'rss',
  enabled boolean not null default true,
  last_pulled_at timestamptz,
  last_pulled_status text,
  created_at timestamptz not null default now()
);

-- Articles: items pulled from feeds.
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references feed_sources(id) on delete cascade,
  external_id text,
  url text not null,
  title text not null,
  summary text,
  content text,
  author text,
  published_at timestamptz,
  fetched_at timestamptz not null default now(),
  raw jsonb,
  status text not null default 'pending'
);

create unique index if not exists articles_source_external_uniq
  on articles(source_id, external_id) where external_id is not null;
create index if not exists articles_published_idx on articles(published_at desc nulls last);
create index if not exists articles_status_idx on articles(status);

-- Classifications: AI output linking articles to opportunities + mines.
create table if not exists classifications (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade unique,
  opportunity_type text,
  confidence numeric(3,2),
  summary text,
  action_recommendation text,
  related_mine_ids uuid[] default '{}',
  related_operators text[] default '{}',
  classified_at timestamptz not null default now(),
  model text,
  raw_response jsonb
);

create index if not exists classifications_type_idx on classifications(opportunity_type);
create index if not exists classifications_mines_gin
  on classifications using gin(related_mine_ids);
create index if not exists classifications_confidence_idx on classifications(confidence desc);

-- User tags / personal notes per article.
create table if not exists article_tags (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  label text not null,
  created_at timestamptz not null default now()
);

create index if not exists article_tags_article_idx on article_tags(article_id);

-- Personal tool: disable RLS. Service role + anon both used from our own app only.
alter table mines disable row level security;
alter table feed_sources disable row level security;
alter table articles disable row level security;
alter table classifications disable row level security;
alter table article_tags disable row level security;

-- New-format Supabase API keys (sb_publishable_*) don't auto-grant table privileges
-- to the anon role the way legacy anon JWTs did. Grant read access explicitly so
-- the publishable key can SELECT. Writes still go through the service role.
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
alter default privileges in schema public grant select on tables to anon, authenticated;
