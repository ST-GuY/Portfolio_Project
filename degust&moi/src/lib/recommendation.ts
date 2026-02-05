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

export type Cocktail = {
  name: string;
  image: string;
  ingredients: string[];
  instructions: LangText;
  baseSpirit: BaseSpirit;
};

export type Recommendation = {
  name: LangText;
  type: string;
  description: LangText;
  explanation: LangText;
  bottle?: Bottle;
  cocktail?: Cocktail;
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
    fr: "Eau-de-vie de vin élégante et chaleureuse, idéale en dégustation ou en cocktail.",
    en: "Elegant grape brandy, perfect for sipping or cocktails.",
  },
  image: "/bottles/brandy.svg",
},

};

/* ================= COCKTAILS ================= */

const cocktailsByKey: Record<string, Cocktail> = {
  rum: {
    name: "Mojito",
    image:
      "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
    ingredients: ["White rum", "Mint", "Lime", "Sugar", "Soda"],
    instructions: {
      fr: "Écraser la menthe, ajouter les ingrédients et compléter avec de l’eau gazeuse.",
      en: "Muddle mint, add ingredients and top with soda water.",
    },
    baseSpirit: "white_rum",
  },

  whisky: {
    name: "Whiskey Sour",
    image:
      "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    ingredients: ["Whisky", "Lemon", "Sugar"],
    instructions: {
      fr: "Mélanger les ingrédients avec de la glace et servir frais.",
      en: "Shake ingredients with ice and serve chilled.",
    },
    baseSpirit: "whisky",
  },

  gin: {
    name: "Gin Fizz",
    image:
      "https://www.thecocktaildb.com/images/media/drink/xhl8q31504351772.jpg",
    ingredients: ["Gin", "Lemon", "Sugar", "Soda"],
    instructions: {
      fr: "Secouer les ingrédients puis compléter avec de l’eau gazeuse.",
      en: "Shake ingredients and top with soda water.",
    },
    baseSpirit: "gin",
  },

  vodka: {
    name: "Moscow Mule",
    image:
      "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg",
    ingredients: ["Vodka", "Ginger beer", "Lime"],
    instructions: {
      fr: "Remplir un verre de glace, ajouter la vodka, le citron vert et compléter avec la ginger beer.",
      en: "Fill a glass with ice, add vodka, lime juice and top with ginger beer.",
    },
    baseSpirit: "vodka",
  },
    brandy: {
    name: { fr: "Cognac", en: "Cognac" },
    origin: { fr: "France", en: "France" },
    description: {
      fr: "Eau-de-vie de vin élégante et chaleureuse, idéale en dégustation ou en cocktail.",
      en: "Elegant grape brandy, perfect for sipping or cocktails.",
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
    cocktailKey: "rum",
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
    cocktailKey: "whisky",
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
    cocktailKey: "gin",
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
    cocktailKey: "vodka",
    fallbackSpirit: "vodka" as BaseSpirit,
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

    const cocktail = cocktailsByKey[alcohol.cocktailKey];
    const spirit = cocktail
      ? cocktail.baseSpirit
      : alcohol.fallbackSpirit;

    return {
      name: alcohol.name,
      type: alcohol.type,
      description: alcohol.description,
      explanation: {
        fr: "Recommandé selon tes préférences.",
        en: "Recommended based on your preferences.",
      },
      cocktail,
      bottle: getBottle(spirit),
      score,
    };
  });

  return scored
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
