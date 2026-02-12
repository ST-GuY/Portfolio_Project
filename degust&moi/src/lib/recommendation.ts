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
  cocktailApiKeys?: string[]; // 👈 plusieurs cocktails
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

type AlcoholProfile = {
  name: LangText;
  type: string;
  description: LangText;
  sweetness: string;
  intensity: string;
  contexts: string[];
  cocktailApiKeys: string[]; // 👈 plusieurs cocktails
  fallbackSpirit: BaseSpirit;
};

const alcohols: AlcoholProfile[] = [
  {
    name: { fr: "Rhum frais & léger", en: "Fresh & light rum" },
    type: "Rhum",
    description: {
      fr: "Un rhum vif et aromatique, idéal pour les cocktails rafraîchissants.",
      en: "A vibrant and aromatic rum, perfect for refreshing cocktails.",
    },
    sweetness: "sweet",
    intensity: "light",
    contexts: ["calm", "aperitif"],
    cocktailApiKeys: ["Mojito", "Daiquiri", "Caipirinha"],
    fallbackSpirit: "white_rum",
  },

  {
    name: { fr: "Whisky fruité & accessible", en: "Fruity & smooth whisky" },
    type: "Whisky",
    description: {
      fr: "Un whisky équilibré aux notes fruitées et légèrement boisées.",
      en: "A balanced whisky with fruity and lightly oaked notes.",
    },
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting"],
    cocktailApiKeys: ["Whiskey Sour", "Old Fashioned"],
    fallbackSpirit: "whisky",
  },

  {
    name: { fr: "Gin frais & aromatique", en: "Fresh & aromatic gin" },
    type: "Gin",
    description: {
      fr: "Un gin frais aux notes botaniques et citronnées.",
      en: "A fresh gin with botanical and citrus notes.",
    },
    sweetness: "dry",
    intensity: "light",
    contexts: ["aperitif"],
    cocktailApiKeys: ["Gin Fizz", "Tom Collins", "Negroni"],
    fallbackSpirit: "gin",
  },

  {
    name: { fr: "Vodka pure & neutre", en: "Clean & neutral vodka" },
    type: "Vodka",
    description: {
      fr: "Une vodka élégante et discrète, parfaite en mixologie.",
      en: "An elegant and neutral vodka, ideal for mixology.",
    },
    sweetness: "dry",
    intensity: "medium",
    contexts: ["aperitif"],
    cocktailApiKeys: ["Moscow Mule", "Bloody Mary"],
    fallbackSpirit: "vodka",
  },

  {
    name: { fr: "Brandy chaleureux", en: "Warm brandy" },
    type: "Brandy",
    description: {
      fr: "Un brandy rond et intense, idéal en dégustation.",
      en: "A warm and rounded brandy, perfect for sipping.",
    },
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting", "calm"],
    cocktailApiKeys: ["Sidecar", "Brandy Alexander"],
    fallbackSpirit: "brandy",
  },
  {
    name: { fr: "Bourbon vanillé", en: "Vanilla bourbon" },
    type: "Whisky",
    description: {
      fr: "Un bourbon rond aux notes de vanille et de caramel.",
      en: "A smooth bourbon with vanilla and caramel notes.",
    },
    sweetness: "sweet",
    intensity: "medium",
    contexts: ["tasting", "calm"],
    cocktailApiKeys: ["Mint Julep", "Boulevardier", "Whiskey Sour"],
    fallbackSpirit: "whisky",
  },
  {
  name: { fr: "Rhum ambré gourmand", en: "Amber rum delight" },
  type: "Rhum",
  description: {
    fr: "Un rhum chaleureux aux notes boisées et épicées.",
    en: "A warm rum with woody and spicy notes.",
  },
  sweetness: "fruity",
  intensity: "medium",
  contexts: ["tasting", "party"],
  cocktailApiKeys: ["Dark 'n' Stormy", "Rum Punch"],
  fallbackSpirit: "amber_rum",
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
  cocktailApiKeys: ["Margarita", "Tequila Sunrise"],
  fallbackSpirit: "tequila",
},
{
  name: { fr: "Gin floral", en: "Floral gin" },
  type: "Gin",
  description: {
    fr: "Un gin délicat aux notes florales et fraîches.",
    en: "A delicate gin with floral and fresh notes.",
  },
  sweetness: "dry",
  intensity: "light",
  contexts: ["aperitif", "calm"],
  cocktailApiKeys: ["French 75", "Gin Tonic"],
  fallbackSpirit: "gin",
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

    // Sweetness (critère principal)
    if (alcohol.sweetness === answers.sweetness) {
      score += 3;
    } else {
      score += 1; // petite compatibilité même si différent
    }

    // Intensité
    if (alcohol.intensity === answers.intensity) {
      score += 2;
    }

    // Contexte
    if (alcohol.contexts.includes(answers.context)) {
      score += 2;
    }

    // Petite variation pour éviter toujours les mêmes résultats
    const randomBoost = Math.random() * 1.5;
    score += randomBoost;

    // Compatibilité %
    const maxScore = 7; // 3 + 2 + 2
    const percentage = Math.min(
      100,
      Math.round((score / maxScore) * 100)
    );

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

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

