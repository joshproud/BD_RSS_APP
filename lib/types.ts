export type Commodity =
  | "iron_ore"
  | "metallurgical_coal"
  | "thermal_coal"
  | "copper"
  | "gold"
  | "silver"
  | "uranium"
  | "zinc"
  | "molybdenum";

export type MineStatus =
  | "operating"
  | "development"
  | "care_and_maintenance"
  | "closed";

export type Mine = {
  id: string;
  name: string;
  operator: string | null;
  commodities: Commodity[];
  country: string;
  region: string | null;
  latitude: number;
  longitude: number;
  status: MineStatus;
  notes: string | null;
  external_refs: Record<string, unknown> | null;
};

export const COMMODITY_COLORS: Record<Commodity, string> = {
  iron_ore: "#b91c1c",         // red
  metallurgical_coal: "#27272a", // near-black
  thermal_coal: "#52525b",      // slate
  copper: "#ea580c",            // copper orange
  gold: "#eab308",              // gold
  silver: "#a1a1aa",            // silver
  uranium: "#65a30d",           // uranium-greenish
  zinc: "#3b82f6",              // blue
  molybdenum: "#7c3aed",        // purple
};

export const COMMODITY_LABELS: Record<Commodity, string> = {
  iron_ore: "Iron Ore",
  metallurgical_coal: "Met Coal",
  thermal_coal: "Thermal Coal",
  copper: "Copper",
  gold: "Gold",
  silver: "Silver",
  uranium: "Uranium",
  zinc: "Zinc",
  molybdenum: "Molybdenum",
};
