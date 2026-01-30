export type Alcohol = {
  category: "spiritueux" | "vin" | "biere" | "liqueur";
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
    name: { fr: "Rhum doux", en: "Smooth rum" },
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
    category: "vin",
    name: { fr: "Vin rouge fruité", en: "Fruity red wine" },
    type: "Vin",
    description: {
      fr: "Un vin rouge souple aux arômes de fruits rouges.",
      en: "A smooth red wine with red fruit aromas.",
    },
    sweetness: "fruity",
    intensity: "light",
    contexts: ["meal", "calm"],
  },
  {
    category: "spiritueux",
    name: { fr: "Tequila blanche", en: "White tequila" },
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
