import type { BaseSpirit } from "./spiritMapping";

/* ================= TYPES ================= */

export type LangText = {
  fr: string;
  en: string;
};

export type Bottle = {
  name: LangText;
  origin: LangText;
  description: LangText;
  image: string;
};

export type Recommendation = {
  name: LangText;
  type: string;
  description: LangText;
  explanation: LangText;
  bottle?: Bottle;
  cocktailApiKeys?: string[];
  fallbackSpirit: BaseSpirit;
  score: number;
};

type Answers = {
  sweetness: string;
  intensity: string;
  context: string;
};

/* ================= BOTTLES ================= */

const bottlesBySpirit: Record<BaseSpirit, Bottle> = {
  white_rum: {
    name: { fr: "Rhum blanc", en: "White rum" },
    origin: { fr: "Caraïbes", en: "Caribbean" },
    description: {
      fr: "Rhum frais et léger, idéal pour les cocktails.",
      en: "Fresh and light rum, perfect for cocktails.",
    },
    image: "/bottles/rum-white.svg",
  },
  amber_rum: {
    name: { fr: "Rhum ambré", en: "Amber rum" },
    origin: { fr: "Caraïbes", en: "Caribbean" },
    description: {
      fr: "Rhum doux et chaleureux, idéal en dégustation.",
      en: "Smooth and warm rum, great for sipping.",
    },
    image: "/bottles/rum-amber.svg",
  },
  gin: {
    name: { fr: "Gin sec", en: "Dry gin" },
    origin: { fr: "Angleterre", en: "England" },
    description: {
      fr: "Gin aromatique aux notes botaniques.",
      en: "Aromatic gin with botanical notes.",
    },
    image: "/bottles/gin.svg",
  },
  vodka: {
    name: { fr: "Vodka", en: "Vodka" },
    origin: { fr: "Europe de l’Est", en: "Eastern Europe" },
    description: {
      fr: "Vodka neutre et pure, idéale pour les cocktails.",
      en: "Neutral and clean vodka, perfect for cocktails.",
    },
    image: "/bottles/vodka.svg",
  },
  whisky: {
    name: { fr: "Whisky écossais", en: "Scotch whisky" },
    origin: { fr: "Écosse", en: "Scotland" },
    description: {
      fr: "Whisky équilibré aux notes fruitées.",
      en: "Balanced whisky with fruity notes.",
    },
    image: "/bottles/whisky.svg",
  },
  bourbon: {
    name: { fr: "Bourbon", en: "Bourbon" },
    origin: { fr: "États-Unis", en: "United States" },
    description: {
      fr: "Whiskey américain aux notes vanillées.",
      en: "American whiskey with vanilla notes.",
    },
    image: "/bottles/bourbon.svg",
  },
  tequila: {
    name: { fr: "Tequila blanche", en: "Blanco tequila" },
    origin: { fr: "Mexique", en: "Mexico" },
    description: {
      fr: "Tequila vive et expressive.",
      en: "Fresh and expressive tequila.",
    },
    image: "/bottles/tequila.svg",
  },
  wine: {
    name: { fr: "Vin rouge", en: "Red wine" },
    origin: { fr: "France", en: "France" },
    description: {
      fr: "Vin rouge fruité et souple.",
      en: "Fruity and smooth red wine.",
    },
    image: "/bottles/wine-red.svg",
  },
  brandy: {
    name: { fr: "Cognac", en: "Cognac" },
    origin: { fr: "France", en: "France" },
    description: {
      fr: "Eau-de-vie élégante et chaleureuse.",
      en: "Elegant and warm grape brandy.",
    },
    image: "/bottles/brandy.svg",
  },
  vermouth: {
    name: { fr: "Vermouth", en: "Vermouth" },
    origin: { fr: "Italie / France", en: "Italy / France" },
    description: {
      fr: "Vin aromatisé utilisé en cocktail.",
      en: "Fortified wine used in cocktails.",
    },
    image: "/bottles/vermouth.svg",
  },
  liqueur: {
    name: { fr: "Liqueur", en: "Liqueur" },
    origin: { fr: "Divers", en: "Various" },
    description: {
      fr: "Alcool sucré aromatisé.",
      en: "Sweet flavored spirit.",
    },
    image: "/bottles/liqueur.svg",
  },
  champagne: {
    name: { fr: "Champagne", en: "Champagne" },
    origin: { fr: "France", en: "France" },
    description: {
      fr: "Vin effervescent élégant.",
      en: "Elegant sparkling wine.",
    },
    image: "/bottles/champagne.svg",
  },
};

/* ================= ALCOHOL PROFILES ================= */

type AlcoholProfile = {
  name: LangText;
  type: string;
  description: LangText;
  sweetness: string;
  intensity: string;
  contexts: string[];
  cocktailApiKeys: string[];
  fallbackSpirit: BaseSpirit;
};

const alcohols: AlcoholProfile[] = [
  {
    name: { fr: "Rhum frais & léger", en: "Fresh & light rum" },
    type: "Rhum",
    description: {
      fr: "Un rhum vif et aromatique.",
      en: "A vibrant and aromatic rum.",
    },
    sweetness: "sweet",
    intensity: "light",
    contexts: ["calm", "aperitif"],
    cocktailApiKeys: ["Mojito", "Daiquiri"],
    fallbackSpirit: "white_rum",
  },
  {
    name: { fr: "Whisky fruité", en: "Fruity whisky" },
    type: "Whisky",
    description: {
      fr: "Un whisky équilibré aux notes fruitées.",
      en: "A balanced whisky with fruity notes.",
    },
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting"],
    cocktailApiKeys: ["Whiskey Sour", "Old Fashioned"],
    fallbackSpirit: "whisky",
  },
  {
    name: { fr: "Tequila intense", en: "Bold tequila" },
    type: "Tequila",
    description: {
      fr: "Une tequila expressive et légèrement poivrée.",
      en: "An expressive and slightly peppery tequila.",
    },
    sweetness: "dry",
    intensity: "strong",
    contexts: ["party", "aperitif"],
    cocktailApiKeys: ["Margarita"],
    fallbackSpirit: "tequila",
  },
  {
  name: { fr: "Champagne festif", en: "Festive champagne" },
  type: "Champagne",
  description: {
    fr: "Un champagne élégant et pétillant, parfait pour célébrer.",
    en: "An elegant sparkling wine, perfect for celebrations.",
  },
  sweetness: "dry",
  intensity: "light",
  contexts: ["party", "aperitif"],
  cocktailApiKeys: ["French 75", "Bellini", "Mimosa"],
  fallbackSpirit: "champagne",
},
{
  name: { fr: "Liqueur gourmande", en: "Gourmet liqueur" },
  type: "Liqueur",
  description: {
    fr: "Une liqueur douce et aromatique, idéale en fin de repas.",
    en: "A sweet and aromatic liqueur, perfect after dinner.",
  },
  sweetness: "sweet",
  intensity: "medium",
  contexts: ["calm", "tasting"],
  cocktailApiKeys: ["Amaretto Sour", "White Russian"],
  fallbackSpirit: "liqueur",
},
{
  name: { fr: "Vermouth aromatique", en: "Aromatic vermouth" },
  type: "Vermouth",
  description: {
    fr: "Un vermouth raffiné aux notes herbacées.",
    en: "A refined fortified wine with herbal notes.",
  },
  sweetness: "dry",
  intensity: "medium",
  contexts: ["aperitif"],
  cocktailApiKeys: ["Negroni", "Martini", "Manhattan"],
  fallbackSpirit: "vermouth",
},
];

/* ================= HELPERS ================= */

function getBottle(spirit: BaseSpirit): Bottle | undefined {
  return bottlesBySpirit[spirit];
}

/* ================= MAIN ================= */

export function getRecommendations(answers: Answers): Recommendation[] {
  const scored: Recommendation[] = alcohols.map((alcohol) => {
    let score = 0;

    if (alcohol.sweetness === answers.sweetness) score += 4;

    if (alcohol.intensity === answers.intensity) {
      score += 4;
    } else {
      const opposite =
        (answers.intensity === "light" && alcohol.intensity === "strong") ||
        (answers.intensity === "strong" && alcohol.intensity === "light");
      if (opposite) score -= 2;
    }

    if (alcohol.contexts.includes(answers.context)) score += 2;

    score += Math.random() * 0.8;

    return {
      name: alcohol.name,
      type: alcohol.type,
      description: alcohol.description,
      explanation: {
        fr: "Recommandé selon tes préférences.",
        en: "Recommended based on your preferences.",
      },
      bottle: getBottle(alcohol.fallbackSpirit),
      cocktailApiKeys: alcohol.cocktailApiKeys,
      fallbackSpirit: alcohol.fallbackSpirit,
      score,
    };
  });

  const sorted = scored.sort((a, b) => b.score - a.score);

  const diversified: Recommendation[] = [];
  const usedTypes = new Set<string>();

  for (const rec of sorted) {
    if (!usedTypes.has(rec.type)) {
      diversified.push(rec);
      usedTypes.add(rec.type);
    }
    if (diversified.length === 4) break;
  }

  return diversified;
}