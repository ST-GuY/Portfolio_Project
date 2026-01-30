export type Alcohol = {
  name: {
    fr: string;
    en: string;
  };
  type: string; // 🔑 clé technique
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
    name: {
      fr: "Whisky fruité",
      en: "Fruity whisky",
    },
    type: "whisky", // ✅
    description: {
      fr: "Un whisky accessible aux arômes fruités et équilibrés.",
      en: "An accessible whisky with fruity notes.",
    },
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting", "calm"],
  },
  {
    name: {
      fr: "Vin rouge fruité",
      en: "Fruity red wine",
    },
    type: "wine", // ✅
    description: {
      fr: "Un vin rouge souple aux arômes de fruits rouges.",
      en: "A smooth red wine with red fruit aromas.",
    },
    sweetness: "fruity",
    intensity: "light",
    contexts: ["meal", "calm"],
  },
  {
    name: {
      fr: "Tequila blanche",
      en: "White tequila",
    },
    type: "tequila", // ✅
    description: {
      fr: "Une tequila fraîche et expressive.",
      en: "A fresh and expressive tequila.",
    },
    sweetness: "dry",
    intensity: "strong",
    contexts: ["party", "aperitif"],
  },
];
