-- Seed: ~50 flagship mines across AU/Indo/PNG/South America.
-- Run after schema.sql. Idempotent on (name, country) via ON CONFLICT (manual dedupe — re-runs replace).

-- Clear existing seed rows (re-run safe). Only do this on the curated seed set, not user-added mines.
delete from mines where notes like '[seed]%';

insert into mines (name, operator, commodities, country, region, latitude, longitude, status, notes, external_refs) values

-- === AUSTRALIA — Iron Ore (Pilbara, WA) ===
('Mt Whaleback',      'BHP',                ARRAY['iron_ore'],         'Australia', 'Pilbara',       -23.3600, 119.7400, 'operating', '[seed] Newman hub; one of the largest single-pit iron ore mines.', '{"asx":"BHP"}'::jsonb),
('Yandi',             'BHP',                ARRAY['iron_ore'],         'Australia', 'Pilbara',       -22.7100, 119.1000, 'operating', '[seed] Pilbara hub; mature operation.', '{"asx":"BHP"}'::jsonb),
('South Flank',       'BHP',                ARRAY['iron_ore'],         'Australia', 'Pilbara',       -22.9300, 118.9600, 'operating', '[seed] New mine, replaced Yandi production; ramped up 2021–2022.', '{"asx":"BHP"}'::jsonb),
('Hope Downs',        'Rio Tinto / Hancock',ARRAY['iron_ore'],         'Australia', 'Pilbara',       -23.0500, 119.1300, 'operating', '[seed] JV between Rio Tinto and Hancock Prospecting.', '{"asx":"RIO"}'::jsonb),
('West Angelas',      'Rio Tinto',          ARRAY['iron_ore'],         'Australia', 'Pilbara',       -23.1300, 118.7100, 'operating', '[seed]', '{"asx":"RIO"}'::jsonb),
('Gudai-Darri',       'Rio Tinto',          ARRAY['iron_ore'],         'Australia', 'Pilbara',       -22.8400, 119.3400, 'operating', '[seed] Rio''s newest Pilbara mine (2022); heavily automated.', '{"asx":"RIO"}'::jsonb),
('Brockman 4',        'Rio Tinto',          ARRAY['iron_ore'],         'Australia', 'Pilbara',       -22.5100, 117.3100, 'operating', '[seed]', '{"asx":"RIO"}'::jsonb),
('Cloudbreak',        'Fortescue',          ARRAY['iron_ore'],         'Australia', 'Pilbara',       -22.3600, 119.4100, 'operating', '[seed]', '{"asx":"FMG"}'::jsonb),
('Christmas Creek',   'Fortescue',          ARRAY['iron_ore'],         'Australia', 'Pilbara',       -22.3400, 119.9600, 'operating', '[seed]', '{"asx":"FMG"}'::jsonb),
('Solomon Hub',       'Fortescue',          ARRAY['iron_ore'],         'Australia', 'Pilbara',       -22.0400, 117.6600, 'operating', '[seed]', '{"asx":"FMG"}'::jsonb),
('Iron Bridge',       'Fortescue',          ARRAY['iron_ore'],         'Australia', 'Pilbara',       -21.7800, 119.0500, 'operating', '[seed] Magnetite concentrate; ramping since 2023.', '{"asx":"FMG"}'::jsonb),
('Roy Hill',          'Hancock Prospecting',ARRAY['iron_ore'],         'Australia', 'Pilbara',       -22.6300, 119.9700, 'operating', '[seed] Private; ~60 Mtpa capacity.', '{}'::jsonb),

-- === AUSTRALIA — Coal ===
('Goonyella Riverside','BHP Mitsubishi Alliance', ARRAY['metallurgical_coal'], 'Australia', 'Bowen Basin', -21.6600, 148.2700, 'operating', '[seed] BMA; flagship met coal.', '{"asx":"BHP"}'::jsonb),
('Peak Downs',        'BHP Mitsubishi Alliance', ARRAY['metallurgical_coal'], 'Australia', 'Bowen Basin', -22.2700, 148.2000, 'operating', '[seed] BMA met coal.', '{"asx":"BHP"}'::jsonb),
('Saraji',            'BHP Mitsubishi Alliance', ARRAY['metallurgical_coal'], 'Australia', 'Bowen Basin', -22.1300, 148.2100, 'operating', '[seed] BMA met coal.', '{"asx":"BHP"}'::jsonb),
('Blackwater',        'Whitehaven Coal',         ARRAY['metallurgical_coal','thermal_coal'], 'Australia', 'Bowen Basin', -23.5800, 148.8800, 'operating', '[seed] Acquired by Whitehaven from BMA in 2024.', '{"asx":"WHC"}'::jsonb),
('Grosvenor',         'Anglo American',          ARRAY['metallurgical_coal'], 'Australia', 'Bowen Basin', -21.8100, 148.0700, 'operating', '[seed] Restarted after 2024 fire; sale to Peabody in progress.', '{}'::jsonb),
('Moranbah North',    'Anglo American',          ARRAY['metallurgical_coal'], 'Australia', 'Bowen Basin', -21.9900, 148.0700, 'operating', '[seed] Underground longwall.', '{}'::jsonb),
('Maules Creek',      'Whitehaven Coal',         ARRAY['thermal_coal','metallurgical_coal'], 'Australia', 'Gunnedah Basin', -30.8500, 149.7800, 'operating', '[seed]', '{"asx":"WHC"}'::jsonb),
('Hunter Valley Operations','Yancoal/Glencore',  ARRAY['thermal_coal'],      'Australia', 'Hunter Valley', -32.5500, 150.9700, 'operating', '[seed] JV thermal coal complex.', '{"asx":"YAL"}'::jsonb),
('Moolarben',         'Yancoal',                 ARRAY['thermal_coal'],      'Australia', 'Western NSW',  -32.4000, 149.8400, 'operating', '[seed]', '{"asx":"YAL"}'::jsonb),
('Carmichael',        'Bravus (Adani)',          ARRAY['thermal_coal'],      'Australia', 'Galilee Basin', -22.0500, 146.4600, 'operating', '[seed] Controversial; operating since 2021.', '{}'::jsonb),

-- === AUSTRALIA — Gold ===
('Boddington',        'Newmont',                 ARRAY['gold','copper'],     'Australia', 'WA Southwest', -32.7800, 116.3600, 'operating', '[seed] Largest gold mine in Australia by production.', '{"nyse":"NEM"}'::jsonb),
('KCGM (Super Pit)',  'Northern Star Resources', ARRAY['gold'],              'Australia', 'WA Goldfields', -30.7800, 121.5000, 'operating', '[seed] Kalgoorlie; Fimiston open pit + Mt Charlotte.', '{"asx":"NST"}'::jsonb),
('Tropicana',         'AngloGold Ashanti / Regis', ARRAY['gold'],            'Australia', 'WA Goldfields', -29.1800, 124.5500, 'operating', '[seed] JV; remote location.', '{"asx":"RRL"}'::jsonb),
('Tanami',            'Newmont',                 ARRAY['gold'],              'Australia', 'Northern Territory', -19.9900, 129.7400, 'operating', '[seed] Underground; major expansion (Power & Expansion) underway.', '{"nyse":"NEM"}'::jsonb),
('Cadia',             'Newmont',                 ARRAY['gold','copper'],     'Australia', 'Central NSW',  -33.4600, 148.9500, 'operating', '[seed] Block cave; major Cu+Au producer.', '{"nyse":"NEM"}'::jsonb),
('Cowal',             'Evolution Mining',        ARRAY['gold'],              'Australia', 'Central NSW',  -33.6200, 147.3900, 'operating', '[seed] Underground expansion underway.', '{"asx":"EVN"}'::jsonb),

-- === AUSTRALIA — Copper ===
('Olympic Dam',       'BHP',                     ARRAY['copper','uranium','gold','silver'], 'Australia', 'South Australia', -30.4400, 136.8700, 'operating', '[seed] Massive polymetallic; BHP studying smelter+refinery expansion.', '{"asx":"BHP"}'::jsonb),
('Mount Isa Copper',  'Glencore',                ARRAY['copper'],            'Australia', 'NW Queensland', -20.7300, 139.4900, 'operating', '[seed] Glencore announced underground Cu mine closure 2025; remaining ops being reshaped.', '{}'::jsonb),
('Prominent Hill',    'BHP',                     ARRAY['copper','gold'],     'Australia', 'South Australia', -29.7200, 135.5500, 'operating', '[seed] Acquired with OZ Minerals (2023).', '{"asx":"BHP"}'::jsonb),
('Carrapateena',      'BHP',                     ARRAY['copper','gold'],     'Australia', 'South Australia', -30.7400, 137.0600, 'operating', '[seed] Block cave; acquired with OZ Minerals.', '{"asx":"BHP"}'::jsonb),
('Ernest Henry',      'Evolution Mining',        ARRAY['copper','gold'],     'Australia', 'NW Queensland', -20.4500, 140.7100, 'operating', '[seed] Underground sub-level cave.', '{"asx":"EVN"}'::jsonb),

-- === INDONESIA ===
('Grasberg',          'PT Freeport Indonesia',   ARRAY['copper','gold'],     'Indonesia', 'Papua',         -4.0500, 137.1200, 'operating', '[seed] One of largest Cu+Au mines globally; transitioned from open pit to underground block cave.', '{"nyse":"FCX"}'::jsonb),
('Batu Hijau',        'Amman Mineral',           ARRAY['copper','gold'],     'Indonesia', 'Sumbawa',       -8.9700, 116.8600, 'operating', '[seed] Open pit; AMNT building Elang as next phase.', '{"idx":"AMMN"}'::jsonb),
('Adaro (Tutupan)',   'PT Adaro Energy',         ARRAY['thermal_coal'],      'Indonesia', 'South Kalimantan', -2.2100, 115.3200, 'operating', '[seed] Largest single coal mine in Indonesia.', '{"idx":"ADRO"}'::jsonb),
('Kaltim Prima Coal', 'PT Bumi Resources',       ARRAY['thermal_coal'],      'Indonesia', 'East Kalimantan', 0.5000, 117.5000, 'operating', '[seed] KPC; one of largest open-cut coal mines globally.', '{"idx":"BUMI"}'::jsonb),
('Berau Coal',        'Berau Coal Energy',       ARRAY['thermal_coal'],      'Indonesia', 'East Kalimantan', 2.0500, 117.4000, 'operating', '[seed]', '{}'::jsonb),
('Bukit Asam',        'PT Bukit Asam (PTBA)',    ARRAY['thermal_coal'],      'Indonesia', 'South Sumatra', -3.7400, 103.7800, 'operating', '[seed] State-owned.', '{"idx":"PTBA"}'::jsonb),

-- === PAPUA NEW GUINEA ===
('Lihir',             'Newmont',                 ARRAY['gold'],              'Papua New Guinea', 'New Ireland', -3.1300, 152.6400, 'operating', '[seed] Geothermal island mine; Newmont reviewing divestment.', '{"nyse":"NEM"}'::jsonb),
('Porgera',           'Barrick / Zijin / PNG',   ARRAY['gold'],              'Papua New Guinea', 'Enga',       -5.4600, 143.1500, 'operating', '[seed] Restarted Dec 2023 after multi-year shutdown.', '{}'::jsonb),
('Ok Tedi',           'Ok Tedi Mining Ltd',      ARRAY['copper','gold'],     'Papua New Guinea', 'Western',    -5.2000, 141.1400, 'operating', '[seed] State-owned (Kumul Mining).', '{}'::jsonb),
('Hidden Valley',     'Harmony Gold',            ARRAY['gold','silver'],     'Papua New Guinea', 'Morobe',     -7.4200, 146.6900, 'operating', '[seed]', '{}'::jsonb),

-- === CHILE — Copper ===
('Escondida',         'BHP (op.) / Rio / JECO',  ARRAY['copper'],            'Chile', 'Antofagasta',        -24.2700, -69.0700, 'operating', '[seed] World''s largest copper mine by production.', '{"asx":"BHP"}'::jsonb),
('Chuquicamata',      'Codelco',                 ARRAY['copper'],            'Chile', 'Antofagasta',        -22.3000, -68.9000, 'operating', '[seed] Iconic; transitioned to underground block cave.', '{}'::jsonb),
('El Teniente',       'Codelco',                 ARRAY['copper'],            'Chile', 'O''Higgins',         -34.1000, -70.3600, 'operating', '[seed] World''s largest underground copper mine.', '{}'::jsonb),
('Collahuasi',        'Anglo American / Glencore', ARRAY['copper'],          'Chile', 'Tarapacá',           -20.9700, -68.7100, 'operating', '[seed] JV; high altitude.', '{}'::jsonb),
('Los Pelambres',     'Antofagasta plc',         ARRAY['copper'],            'Chile', 'Coquimbo',           -31.6900, -70.4900, 'operating', '[seed] Desalination + expansion program completed.', '{"lse":"ANTO"}'::jsonb),
('Los Bronces',       'Anglo American',          ARRAY['copper'],            'Chile', 'Metropolitana',      -33.1300, -70.3000, 'operating', '[seed] Underground expansion plan stalled by environmental approval.', '{}'::jsonb),
('Centinela',         'Antofagasta plc',         ARRAY['copper','gold'],     'Chile', 'Antofagasta',        -22.9900, -69.0500, 'operating', '[seed] Second concentrator project under construction.', '{"lse":"ANTO"}'::jsonb),
('Spence',            'BHP',                     ARRAY['copper'],            'Chile', 'Antofagasta',        -22.7800, -69.3000, 'operating', '[seed] SGO concentrator since 2020.', '{"asx":"BHP"}'::jsonb),

-- === PERU — Copper ===
('Antamina',          'BHP / Glencore / Teck / Mitsubishi', ARRAY['copper','zinc'], 'Peru', 'Ancash', -9.5500, -77.0700, 'operating', '[seed] Cu+Zn polymetallic; long mine life extension underway.', '{}'::jsonb),
('Cerro Verde',       'Freeport-McMoRan',        ARRAY['copper','molybdenum'], 'Peru', 'Arequipa', -16.5500, -71.5900, 'operating', '[seed]', '{"nyse":"FCX"}'::jsonb),
('Las Bambas',        'MMG',                     ARRAY['copper'],            'Peru', 'Apurímac',           -14.0700, -72.3200, 'operating', '[seed] Recurring community/road blockades; Chalcobamba expansion.', '{}'::jsonb),
('Quellaveco',        'Anglo American',          ARRAY['copper','molybdenum'],'Peru', 'Moquegua',          -17.1000, -70.7800, 'operating', '[seed] Newest major Cu mine; commissioned 2022.', '{}'::jsonb),
('Toquepala',         'Southern Copper',         ARRAY['copper','molybdenum'],'Peru', 'Tacna',             -17.2300, -70.6000, 'operating', '[seed]', '{"nyse":"SCCO"}'::jsonb),

-- === BRAZIL — Iron Ore ===
('Carajás S11D',      'Vale',                    ARRAY['iron_ore'],          'Brazil', 'Pará',              -6.3600, -50.3200, 'operating', '[seed] World''s largest iron ore complex; very high grade.', '{"nyse":"VALE"}'::jsonb),
('Itabira complex',   'Vale',                    ARRAY['iron_ore'],          'Brazil', 'Minas Gerais',      -19.6200, -43.2200, 'operating', '[seed] Vale''s historic Minas Gerais hub.', '{"nyse":"VALE"}'::jsonb),
('Minas-Rio',         'Anglo American',          ARRAY['iron_ore'],          'Brazil', 'Minas Gerais',      -19.4600, -43.4000, 'operating', '[seed] Pellet feed via 529 km slurry pipeline to port.', '{}'::jsonb);
