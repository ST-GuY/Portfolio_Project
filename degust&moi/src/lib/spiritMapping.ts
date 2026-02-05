import data from "../data/generatedAlcohols.json";

/* ================= TYPES ================= */

export type BaseSpirit =
  | "white_rum"
  | "amber_rum"
  | "vodka"
  | "gin"
  | "whisky"
  | "tequila"
  | "brandy"
  | "wine";

/* ================= NORMALIZATION MAP ================= */

/**
 * Mappe les ingrédients bruts de TheCocktailDB
 * vers des alcools de base pédagogiques
 * (mapping strict, utilisé en fallback)
 */
const NORMALIZATION_MAP: Record<string, BaseSpirit> = {
  // 🍹 RUM
  "light rum": "white_rum",
  "white rum": "white_rum",
  "dark rum": "amber_rum",
  "spiced rum": "amber_rum",
  "overproof rum": "amber_rum",

  // 🥃 WHISKY
  "whiskey": "whisky",
  "scotch": "whisky",
  "bourbon": "whisky",
  "rye whiskey": "whisky",
  "blended whiskey": "whisky",

  // 🍸 CLEAR SPIRITS
  "vodka": "vodka",
  "gin": "gin",
  "tequila": "tequila",

  // 🥃 BRANDY / COGNAC
  "brandy": "brandy",
  "cognac": "brandy",
  "armagnac": "brandy",

  // 🍷 WINE
  "red wine": "wine",
  "white wine": "wine",
  "wine": "wine",
  "vermouth": "wine",
  "sherry": "wine",
};

/* ================= HELPERS ================= */

/**
 * Normalise un ingrédient brut vers un BaseSpirit
 */
export function normalizeSpirit(raw: string): BaseSpirit | null {
  if (!raw) return null;

  const key = raw.toLowerCase().trim();

  /* ---------- BRANDY & VARIANTS ---------- */
  if (key.includes("brandy")) return "brandy";
  if (key === "cognac" || key === "armagnac") return "brandy";

  /* ---------- VODKA ---------- */
  if (key.includes("vodka")) return "vodka";

  /* ---------- WHISKY / WHISKEY ---------- */
  if (key.includes("whiskey") || key.includes("whisky")) {
    return "whisky";
  }

  /* ---------- RUM ---------- */
  if (key.includes("rum")) {
    if (
      key.includes("dark") ||
      key.includes("gold") ||
      key.includes("anejo") ||
      key.includes("añejo") ||
      key.includes("spiced") ||
      key.includes("overproof")
    ) {
      return "amber_rum";
    }
    return "white_rum";
  }

  /* ---------- GIN ---------- */
  if (key.includes("gin")) return "gin";

  /* ---------- TEQUILA ---------- */
  if (key.includes("tequila")) return "tequila";

  /* ---------- WINE & FORTIFIED ---------- */
  if (
    key.includes("wine") ||
    key.includes("vermouth") ||
    key.includes("sherry")
  ) {
    return "wine";
  }

  /* ---------- STRICT FALLBACK ---------- */
  return NORMALIZATION_MAP[key] ?? null;
}

/* ================= AVAILABLE SPIRITS ================= */

/**
 * Liste finale des alcools de base disponibles,
 * dérivés automatiquement de l'API.
 */
export const AVAILABLE_BASE_SPIRITS: BaseSpirit[] = Array.from(
  new Set(
    data.baseSpirits
      .map((s: string) => normalizeSpirit(s))
      .filter((s): s is BaseSpirit => Boolean(s))
  )
);

/* ================= DEBUG ================= */

/**
 * Affiche les alcools non mappés pour faciliter l’évolution
 */
const unknownSpirits = data.baseSpirits.filter(
  (s: string) => !normalizeSpirit(s)
);

if (unknownSpirits.length > 0) {
  console.warn("⚠️ Alcools non mappés depuis l’API :", unknownSpirits);
}
