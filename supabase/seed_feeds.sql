-- Seed: ~10 RSS feed sources for mining intelligence.
-- Idempotent via ON CONFLICT (url) DO UPDATE.

insert into feed_sources (name, url, source_type, enabled) values
  ('mining.com',             'https://www.mining.com/feed/',                       'rss', true),
  ('Australian Mining',      'https://www.australianmining.com.au/feed/',          'rss', true),
  ('International Mining',   'https://im-mining.com/feed/',                        'rss', true),
  ('Mining Technology',      'https://www.mining-technology.com/feed/',            'rss', true),
  ('Northern Miner',         'https://www.northernminer.com/feed/',                'rss', true),
  ('ASX: BHP (Listcorp)',    'https://www.listcorp.com/asx/bhp/rss',               'rss', true),
  ('ASX: RIO (Listcorp)',    'https://www.listcorp.com/asx/rio/rss',               'rss', true),
  ('ASX: FMG (Listcorp)',    'https://www.listcorp.com/asx/fmg/rss',               'rss', true),
  ('ASX: WHC (Listcorp)',    'https://www.listcorp.com/asx/whc/rss',               'rss', true),
  ('ASX: NST (Listcorp)',    'https://www.listcorp.com/asx/nst/rss',               'rss', true)
on conflict (url) do update set
  name = excluded.name,
  enabled = excluded.enabled;
