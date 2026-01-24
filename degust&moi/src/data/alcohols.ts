export type Alcohol = {
  name: string;
  type: string;
  sweetness: string;
  intensity: string;
  contexts: string[];
  description: string;
};

export const alcohols: Alcohol[] = [
  {
    name: "Whisky fruité",
    type: "Whisky",
    sweetness: "fruity",
    intensity: "medium",
    contexts: ["tasting", "calm"],
    description: "Un whisky accessible aux arômes fruités et équilibrés.",
  },
  {
    name: "Rhum doux",
    type: "Rhum",
    sweetness: "sweet",
    intensity: "light",
    contexts: ["aperitif", "calm"],
    description: "Un rhum rond et légèrement sucré, facile à apprécier.",
  },
  {
    name: "Gin sec",
    type: "Gin",
    sweetness: "dry",
    intensity: "strong",
    contexts: ["aperitif", "tasting"],
    description: "Un gin sec et intense, idéal pour les amateurs de caractère.",
  },
];
