"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { getRecommendations } from "../../src/lib/recommendation";

type Lang = "fr" | "en";

type Drink = {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | null;
};

type Bottle = {
  name: string;
  origin: string;
  description: string;
  image: string;
};

/* =======================
   Utils
======================= */

function translateInstructions(text: string) {
  const dictionary: Record<string, string> = {
    "Shake": "Secouer",
    "Stir": "Remuer",
    "Strain": "Filtrer",
    "Pour": "Verser",
    "Add": "Ajouter",
    "Serve": "Servir",
    "Garnish": "Garnir",
    "Fill": "Remplir",
    "ice": "glace",
    "glass": "verre",
  };

  let translated = text;

  Object.entries(dictionary).forEach(([en, fr]) => {
    translated = translated.replace(new RegExp(en, "gi"), fr);
  });

  if (/[a-z]{3,}/i.test(translated)) {
    return "Mélanger les ingrédients avec de la glace, filtrer dans un verre adapté et servir frais.";
  }

  return translated;
}

function getIngredients(drink: Drink) {
  const ingredients: string[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
    }
  }

  return ingredients;
}

/* =======================
   Page
======================= */

export default function ResultatsPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Drink | null>>({});
  const [bottles, setBottles] = useState<Record<number, Bottle | null>>({});
  const [openRecipe, setOpenRecipe] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);

    const stored = localStorage.getItem("degust-moi-answers");
    if (!stored) return;

    const answers = JSON.parse(stored);
    const recs = getRecommendations(answers);
    setRecommendations(recs);

    recs.forEach(async (rec, index) => {
      let apiType = "rum";
      const type = rec.type.toLowerCase();

      if (type.includes("whisky")) apiType = "whiskey";
      if (type.includes("gin")) apiType = "gin";

      const cocktailRes = await fetch(`/api/alcohol?type=${apiType}`);
      const cocktailData = await cocktailRes.json();
      setCocktails((prev) => ({ ...prev, [index]: cocktailData.drink }));

      const bottleRes = await fetch(`/api/bottle?type=${apiType}`);
      const bottleData = await bottleRes.json();
      setBottles((prev) => ({ ...prev, [index]: bottleData.bottle }));
    });
  }, []);

  function toggleLang() {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }

  return (
    <main className="min-h-screen px-4 py-10 pb-32">
      <ThemeToggle />

      {/* 🌍 Lang toggle */}
      <button
        onClick={toggleLang}
        className="fixed top-4 left-4 z-50 px-3 py-2 rounded-full border text-sm"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        {lang === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">
          {lang === "fr" ? "Vos recommandations" : "Your recommendations"}
        </h1>

        <div className="grid gap-10">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-lg p-6"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <h2 className="text-2xl font-semibold mb-1">
                {rec.name[lang]}
              </h2>

              <p className="mb-2">{rec.description[lang]}</p>

              <p className="text-sm italic mb-4">
                {rec.explanation[lang]}
              </p>

              {/* 🧴 BOUTEILLE */}
              {bottles[index] && (
                <div className="mt-4 border-t pt-4">
                  <p className="font-medium mb-2">
                    🧴 {lang === "fr" ? "Bouteille suggérée" : "Suggested bottle"}
                  </p>

                  <div className="flex gap-4 items-center">
                    <img
                      src={bottles[index].image}
                      alt={bottles[index].name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{bottles[index].name}</p>
                      <p className="text-sm">
                        {lang === "fr" ? "Origine" : "Origin"} :{" "}
                        {bottles[index].origin}
                      </p>
                      <p className="text-sm mt-1">
                        {bottles[index].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 🍸 COCKTAIL */}
              {cocktails[index] && (
                <div className="mt-6 border-t pt-4">
                  <p className="font-medium mb-2">
                    🍸 {lang === "fr" ? "Cocktail associé" : "Associated cocktail"}
                  </p>

                  <div className="flex gap-4 items-center">
                    <img
                      src={cocktails[index]!.strDrinkThumb}
                      alt={cocktails[index]!.strDrink}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">
                        {cocktails[index]!.strDrink}
                      </p>

                      <button
                        onClick={() =>
                          setOpenRecipe((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                        className="text-sm underline mt-1 transition-all hover:opacity-80"
                        style={{ color: "var(--accent)" }}
                      >
                        {openRecipe[index]
                          ? lang === "fr"
                            ? "Masquer la recette ↑"
                            : "Hide recipe ↑"
                          : lang === "fr"
                          ? "Voir la recette ↓"
                          : "Show recipe ↓"}
                      </button>
                    </div>
                  </div>

                  {/* ✨ RECETTE ANIMÉE */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-500 ease-out
                      ${
                        openRecipe[index]
                          ? "max-h-[500px] opacity-100 translate-y-0"
                          : "max-h-0 opacity-0 -translate-y-2"
                      }
                    `}
                  >
                    <div className="mt-4 text-sm">
                      <p className="font-medium mb-2">
                        {lang === "fr" ? "Ingrédients" : "Ingredients"} :
                      </p>

                      <ul className="list-disc ml-5 mb-3">
                        {getIngredients(cocktails[index]!).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>

                      <p className="font-medium mb-1">
                        {lang === "fr" ? "Préparation" : "Preparation"} :
                      </p>

                      <p>
                        {lang === "fr"
                          ? translateInstructions(
                              cocktails[index]!.strInstructions
                            )
                          : cocktails[index]!.strInstructions}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="/questionnaire"
            className="inline-block px-8 py-3 rounded-xl text-white transition hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {lang === "fr"
              ? "Refaire le questionnaire"
              : "Restart questionnaire"}
          </a>
        </div>
      </div>
    </main>
  );
}
