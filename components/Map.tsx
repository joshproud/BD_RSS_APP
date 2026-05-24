"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useMemo, useState } from "react";
import {
  Map as MapLibreMap,
  NavigationControl,
  Source,
  Layer,
  Popup,
  type MapMouseEvent,
  type LayerProps,
} from "react-map-gl/maplibre";
import type { Mine } from "@/lib/types";
import { COMMODITY_COLORS, COMMODITY_LABELS } from "@/lib/types";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/positron";

const MINES_LAYER_ID = "mines-pins";

const minesLayer: LayerProps = {
  id: MINES_LAYER_ID,
  type: "circle",
  source: "mines",
  paint: {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      1, 4,
      4, 5,
      8, 8,
    ],
    "circle-color": ["get", "color"],
    "circle-stroke-color": "#09090b",
    "circle-stroke-width": 1.5,
    "circle-opacity": 0.95,
  },
};

function primaryCommodity(m: Mine): keyof typeof COMMODITY_COLORS {
  return (m.commodities[0] ?? "iron_ore") as keyof typeof COMMODITY_COLORS;
}

export function WorldMap({ mines }: { mines: Mine[] }) {
  const [selected, setSelected] = useState<Mine | null>(null);
  const [cursor, setCursor] = useState<string>("grab");

  const geojson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: mines.map((m) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [m.longitude, m.latitude],
        },
        properties: {
          id: m.id,
          name: m.name,
          color: COMMODITY_COLORS[primaryCommodity(m)],
        },
      })),
    }),
    [mines],
  );

  function handleClick(e: MapMouseEvent) {
    const feature = e.features?.[0];
    if (!feature) {
      setSelected(null);
      return;
    }
    const id = feature.properties?.id as string | undefined;
    const mine = mines.find((m) => m.id === id) ?? null;
    setSelected(mine);
  }

  return (
    <div className="w-full h-full relative">
      <MapLibreMap
        initialViewState={{ longitude: 90, latitude: -10, zoom: 1.8 }}
        mapStyle={MAP_STYLE}
        interactiveLayerIds={[MINES_LAYER_ID]}
        onClick={handleClick}
        onMouseEnter={() => setCursor("pointer")}
        onMouseLeave={() => setCursor("grab")}
        cursor={cursor}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />
        {mines.length > 0 && (
          <Source id="mines" type="geojson" data={geojson}>
            <Layer {...minesLayer} />
          </Source>
        )}
        {selected && (
          <Popup
            longitude={selected.longitude}
            latitude={selected.latitude}
            anchor="bottom"
            onClose={() => setSelected(null)}
            closeButton
            closeOnClick={false}
            className="mine-popup"
          >
            <div className="text-zinc-900 text-sm min-w-[200px]">
              <div className="font-semibold">{selected.name}</div>
              {selected.operator && (
                <div className="text-zinc-600 text-xs">{selected.operator}</div>
              )}
              <div className="text-xs text-zinc-500 mt-1">
                {selected.region ? `${selected.region}, ` : ""}
                {selected.country}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selected.commodities.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded"
                    style={{
                      background: COMMODITY_COLORS[c],
                      color: "white",
                    }}
                  >
                    {COMMODITY_LABELS[c] ?? c}
                  </span>
                ))}
              </div>
              {selected.notes && (
                <div className="text-xs text-zinc-600 mt-2 leading-snug">
                  {selected.notes.replace(/^\[seed\]\s*/, "")}
                </div>
              )}
            </div>
          </Popup>
        )}
      </MapLibreMap>
      <Legend />
    </div>
  );
}

function Legend() {
  const items: { commodity: keyof typeof COMMODITY_COLORS; label: string }[] = [
    { commodity: "iron_ore", label: "Iron Ore" },
    { commodity: "copper", label: "Copper" },
    { commodity: "gold", label: "Gold" },
    { commodity: "metallurgical_coal", label: "Met Coal" },
    { commodity: "thermal_coal", label: "Thermal Coal" },
  ];
  return (
    <div className="absolute bottom-4 right-4 bg-zinc-900/90 border border-zinc-800 rounded px-3 py-2 backdrop-blur">
      <div className="text-[10px] uppercase tracking-wide text-zinc-500 mb-1">Commodity</div>
      <div className="flex flex-col gap-1">
        {items.map((i) => (
          <div key={i.commodity} className="flex items-center gap-2 text-xs text-zinc-300">
            <span
              className="w-2.5 h-2.5 rounded-full border border-zinc-950"
              style={{ background: COMMODITY_COLORS[i.commodity] }}
            />
            {i.label}
          </div>
        ))}
      </div>
    </div>
  );
}
