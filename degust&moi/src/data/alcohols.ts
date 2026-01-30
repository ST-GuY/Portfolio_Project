export type Alcohol = {
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
    name: {
      fr: "Rhum doux",
      en: "Smooth rum",
    },
    type: "Rhum",
    description: {
      fr: "Un rhum rond et légèrement sucré, facile à apprécier.",
      en: "A smooth and slightly sweet rum, easy to enjoy.",
    },
    sweetness: "sweet",
    intensity: "medium",
    contexts: ["calm", "aperitif"],
  },
  {
    name: {
      fr: "Whisky fruité",
      en: "Fruity whisky",
    },
    type: "Whisky",
    description: {
      fr: "Un whisky accessible aux arômes fruités et équilibrés.",
      en: "An approachable whisky with fruity and balanced aromas.",
    },
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting", "calm"],
  },
  {
    name: {
      fr: "Gin sec",
      en: "Dry gin",
    },
    type: "Gin",
    description: {
      fr: "Un gin sec et aromatique, idéal pour les cocktails frais.",
      en: "A dry and aromatic gin, ideal for fresh cocktails.",
    },
    sweetness: "dry",
    intensity: "light",
    contexts: ["aperitif", "tasting"],
  },
];
