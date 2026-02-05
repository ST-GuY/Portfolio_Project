import { AVAILABLE_BASE_SPIRITS } from "./spiritMapping";

/* ================= TYPES ================= */

export type LangText = {
  fr: string;
  en: string;
};

export type BaseSpirit =
  | "white_rum"
  | "amber_rum"
  | "gin"
  | "vodka"
  | "whisky"
  | "tequila"
  | "wine"
  | "brandy";

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
  cocktailApiKey?: string; // 👈 clé API TheCocktailDB
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
      fr: "Eau-de-vie de vin élégante et chaleureuse.",
      en: "Elegant grape brandy, warm and smooth.",
    },
    image: "/bottles/brandy.svg",
  },
};

/* ================= ALCOOLS ================= */

const alcohols = [
  {
    name: { fr: "Rhum doux", en: "Smooth rum" },
    type: "Rhum",
    description: {
      fr: "Un rhum rond et légèrement sucré.",
      en: "A smooth and slightly sweet rum.",
    },
    sweetness: "sweet",
    intensity: "light",
    contexts: ["calm", "aperitif"],
    cocktailApiKey: "Mojito",
    fallbackSpirit: "amber_rum" as BaseSpirit,
  },

  {
    name: { fr: "Whisky fruité", en: "Fruity whisky" },
    type: "Whisky",
    description: {
      fr: "Un whisky accessible aux arômes fruités.",
      en: "An accessible whisky with fruity aromas.",
    },
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting"],
    cocktailApiKey: "Whiskey Sour",
    fallbackSpirit: "whisky" as BaseSpirit,
  },

  {
    name: { fr: "Gin sec", en: "Dry gin" },
    type: "Gin",
    description: {
      fr: "Un gin sec et aromatique.",
      en: "A dry and aromatic gin.",
    },
    sweetness: "dry",
    intensity: "light",
    contexts: ["aperitif"],
    cocktailApiKey: "Gin Fizz",
    fallbackSpirit: "gin" as BaseSpirit,
  },

  {
    name: { fr: "Vodka neutre", en: "Neutral vodka" },
    type: "Vodka",
    description: {
      fr: "Une vodka pure et discrète, parfaite en cocktail.",
      en: "A clean and neutral vodka, perfect for cocktails.",
    },
    sweetness: "dry",
    intensity: "medium",
    contexts: ["aperitif"],
    cocktailApiKey: "Moscow Mule",
    fallbackSpirit: "vodka" as BaseSpirit,
  },

  {
    name: { fr: "Brandy élégant", en: "Elegant brandy" },
    type: "Brandy",
    description: {
      fr: "Un brandy rond et chaleureux, idéal en dégustation.",
      en: "A warm and rounded brandy, perfect for sipping.",
    },
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting", "calm"],
    cocktailApiKey: "Sidecar",
    fallbackSpirit: "brandy" as BaseSpirit,
  },
];

/* ================= HELPERS ================= */

function getBottle(spirit: BaseSpirit): Bottle | undefined {
  if (!AVAILABLE_BASE_SPIRITS.includes(spirit)) return undefined;
  return bottlesBySpirit[spirit];
}

/* ================= MAIN ================= */

export function getRecommendations(answers: Answers): Recommendation[] {
  const scored = alcohols.map((alcohol) => {
    let score = 0;

    if (alcohol.sweetness === answers.sweetness) score += 2;
    if (alcohol.intensity === answers.intensity) score += 1;
    if (alcohol.contexts.includes(answers.context)) score += 1;

    return {
      name: alcohol.name,
      type: alcohol.type,
      description: alcohol.description,
      explanation: {
        fr: "Recommandé selon tes préférences.",
        en: "Recommended based on your preferences.",
      },
      cocktailApiKey: alcohol.cocktailApiKey,
      bottle: getBottle(alcohol.fallbackSpirit),
      score,
    };
  });

  return scored
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
