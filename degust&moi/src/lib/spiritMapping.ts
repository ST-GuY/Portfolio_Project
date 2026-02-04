import data from "../data/generatedAlcohols.json";

export type BaseSpirit =
  | "white_rum"
  | "amber_rum"
  | "vodka"
  | "gin"
  | "whisky"
  | "tequila"
  | "brandy"
  | "wine";

const NORMALIZATION_MAP: Record<string, BaseSpirit> = {
  "light rum": "white_rum",
  "white rum": "white_rum",
  "dark rum": "amber_rum",
  "spiced rum": "amber_rum",

  vodka: "vodka",
  gin: "gin",

  scotch: "whisky",
  whiskey: "whisky",
  bourbon: "whisky",

  tequila: "tequila",

  brandy: "brandy",
  cognac: "brandy",

  "red wine": "wine",
  "white wine": "wine",
};

export function normalizeSpirit(raw: string): BaseSpirit | null {
  const key = raw.toLowerCase();
  return NORMALIZATION_MAP[key] ?? null;
}

export const AVAILABLE_BASE_SPIRITS: BaseSpirit[] = Array.from(
  new Set(
    data.baseSpirits
      .map((s: string) => normalizeSpirit(s))
      .filter(Boolean)
  )
) as BaseSpirit[];
