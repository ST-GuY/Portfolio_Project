export type AlcoholCategory =
  | "spiritueux"
  | "vin"
  | "biere"
  | "liqueur";

export type Alcohol = {
  category: AlcoholCategory;
  name: {
    fr: string;
    en: string;
  };
  type: string;
  description: {
    fr: string;
    en: string;
  };
  sweetness: string;
  intensity: string;
  contexts: string[];
};

export const alcohols: Alcohol[] = [
  {
    category: "spiritueux",
    name: {
      fr: "Rhum doux",
      en: "Smooth rum",
    },
    type: "Rhum",
    description: {
      fr: "Un rhum rond et légèrement sucré, facile à apprécier.",
      en: "A smooth and slightly sweet rum.",
    },
    sweetness: "sweet",
    intensity: "medium",
    contexts: ["calm", "aperitif"],
  },
  {
    category: "spiritueux",
    name: {
      fr: "Whisky fruité",
      en: "Fruity whisky",
    },
    type: "Whisky",
    description: {
      fr: "Un whisky accessible aux arômes fruités et équilibrés.",
      en: "An approachable whisky with fruity aromas.",
    },
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting", "calm"],
  },
  {
    category: "spiritueux",
    name: {
      fr: "Gin sec",
      en: "Dry gin",
    },
    type: "Gin",
    description: {
      fr: "Un gin sec et aromatique, idéal pour les cocktails frais.",
      en: "A dry and aromatic gin, ideal for cocktails.",
    },
    sweetness: "dry",
    intensity: "light",
    contexts: ["aperitif", "tasting"],
  },
  {
    category: "vin",
    name: {
      fr: "Vin rouge fruité",
      en: "Fruity red wine",
    },
    type: "Vin",
    description: {
      fr: "Un vin rouge souple aux arômes de fruits rouges.",
      en: "A smooth red wine with red fruit notes.",
    },
    sweetness: "fruity",
    intensity: "light",
    contexts: ["meal", "calm"],
  },
  {
    category: "spiritueux",
    name: {
      fr: "Tequila blanche",
      en: "White tequila",
    },
    type: "Tequila",
    description: {
      fr: "Une tequila fraîche et expressive.",
      en: "A fresh and expressive tequila.",
    },
    sweetness: "dry",
    intensity: "strong",
    contexts: ["party", "aperitif"],
  },
];
