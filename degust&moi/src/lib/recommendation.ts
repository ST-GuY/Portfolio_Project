/* ================= TYPES ================= */

type Answers = {
  sweetness: string;
  intensity: string;
  context: string;
};

type TextI18n = {
  fr: string;
  en: string;
};

type Bottle = {
  name: TextI18n;
  origin: TextI18n;
  description: TextI18n;
  image: string;
};

type Cocktail = {
  name: string;
  image: string;
  ingredients: string[];
  instructions: TextI18n;
};

type Recommendation = {
  name: TextI18n;
  type: string;
  description: TextI18n;
  explanation: TextI18n;
  score: number;
  bottle?: Bottle;
  cocktail?: Cocktail;
};

/* ================= DATA ================= */

const ALCOHOLS: Recommendation[] = [
  {
    name: {
      fr: "Vin rouge fruité",
      en: "Fruity red wine",
    },
    type: "wine",
    description: {
      fr: "Un vin rouge souple aux arômes de fruits rouges.",
      en: "A smooth red wine with red fruit aromas.",
    },
    explanation: {
      fr: "",
      en: "",
    },
    score: 0,
    bottle: {
      name: {
        fr: "Vin rouge",
        en: "Red wine",
      },
      origin: {
        fr: "France",
        en: "France",
      },
      description: {
        fr: "Vin rouge fruité et facile à apprécier.",
        en: "Fruity and easy-drinking red wine.",
      },
      image: "/bottles/wine-red.svg",
    },
    cocktail: {
      name: "Sangria",
      image:
        "https://www.thecocktaildb.com/images/media/drink/xxyywq1454511117.jpg",
      ingredients: ["Red wine", "Orange", "Sugar", "Brandy"],
      instructions: {
        fr: "Mélanger le vin avec les fruits, ajouter les autres ingrédients et servir bien frais.",
        en: "Mix wine with fruits, add remaining ingredients and serve chilled.",
      },
    },
  },

  {
    name: {
      fr: "Whisky fruité",
      en: "Fruity whisky",
    },
    type: "whisky",
    description: {
      fr: "Un whisky accessible aux notes fruitées et équilibrées.",
      en: "An accessible whisky with fruity and balanced notes.",
    },
    explanation: {
      fr: "",
      en: "",
    },
    score: 0,
    bottle: {
      name: {
        fr: "Whisky écossais",
        en: "Scotch whisky",
      },
      origin: {
        fr: "Écosse",
        en: "Scotland",
      },
      description: {
        fr: "Whisky doux et fruité.",
        en: "Smooth and fruity whisky.",
      },
      image: "/bottles/whisky.svg",
    },
    cocktail: {
      name: "Whiskey Sour",
      image:
        "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
      ingredients: ["Whiskey", "Lemon juice", "Sugar"],
      instructions: {
        fr: "Secouer avec de la glace, filtrer et servir.",
        en: "Shake with ice, strain and serve.",
      },
    },
  },

  {
    name: {
      fr: "Rhum doux",
      en: "Smooth rum",
    },
    type: "rum",
    description: {
      fr: "Un rhum rond et légèrement sucré.",
      en: "A smooth and slightly sweet rum.",
    },
    explanation: {
      fr: "",
      en: "",
    },
    score: 0,
    bottle: {
      name: {
        fr: "Rhum ambré",
        en: "Amber rum",
      },
      origin: {
        fr: "Caraïbes",
        en: "Caribbean",
      },
      description: {
        fr: "Rhum doux et chaleureux.",
        en: "Warm and smooth rum.",
      },
      image: "/bottles/rum.svg",
    },
    cocktail: {
      name: "Mojito",
      image:
        "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
      ingredients: ["White rum", "Mint", "Lime", "Sugar", "Soda"],
      instructions: {
        fr: "Écraser la menthe, ajouter les ingrédients et compléter avec de l’eau gazeuse.",
        en: "Muddle mint, add ingredients and top with soda water.",
      },
    },
  },
];

/* ================= LOGIC ================= */

export function getRecommendations(answers: Answers): Recommendation[] {
  const scored = ALCOHOLS.map((alcohol) => {
    let score = 0;
    const reasons: string[] = [];

    if (answers.sweetness === "sweet" && alcohol.type !== "whisky") {
      score += 1;
      reasons.push("goût");
    }

    if (answers.intensity === "light" && alcohol.type === "wine") {
      score += 1;
      reasons.push("intensité");
    }

    if (answers.context === "aperitif" && alcohol.type !== "whisky") {
      score += 1;
      reasons.push("contexte");
    }

    return {
      ...alcohol,
      score,
      explanation: {
        fr:
          score > 0
            ? `Recommandé pour son ${reasons.join(", ")}.`
            : "Suggestion pédagogique basée sur un profil général.",
        en:
          score > 0
            ? `Recommended for its ${reasons.join(", ")}.`
            : "Educational suggestion based on a general profile.",
      },
    };
  });

  // ⚠️ IMPORTANT : on ne filtre PLUS → jamais de page vide
  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}
