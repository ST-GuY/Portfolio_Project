"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { getRecommendations } from "../../src/lib/recommendation";
import { alcoholCategories } from "@/src/data/alcoholCategories";

type Cocktail = {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | null;
};

export default function ResultatsPage() {
  const [recs, setRecs] = useState<any[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Cocktail | null>>({});
  const [bottles, setBottles] = useState<Record<number, any>>({});
  const [openRecipe, setOpenRecipe] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem("degust-moi-answers");
    if (!stored) return;

    const answers = JSON.parse(stored);
    const recommendations = getRecommendations(answers);
    setRecs(recommendations);

    recommendations.forEach(async (rec, index) => {
      const category = alcoholCategories.find(
        (c) => c.key === rec.type
      );

      if (!category) return;

      // 🧴 bouteille
      const bottleRes = await fetch(`/api/bottle?type=${category.key}`);
      const bottleData = await bottleRes.json();
      setBottles((b) => ({ ...b, [index]: bottleData.bottle }));

      // 🍸 cocktail + recette
      if (category.hasCocktail) {
        const cocktailRes = await fetch(
          `/api/alcohol?type=${category.cocktailApiKey}`
        );
        const cocktailData = await cocktailRes.json();
        setCocktails((c) => ({ ...c, [index]: cocktailData.drink }));
      }
    });
  }, []);

  function getIngredients(drink: Cocktail) {
    const list: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const ing = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ing) list.push(measure ? `${measure} ${ing}` : ing);
    }
    return list;
  }

  return (
    <main className="min-h-screen px-4 py-10 pb-32">
      <ThemeToggle />

      <h1 className="text-4xl font-bold text-center mb-12">
        Vos recommandations
      </h1>

      <div className="max-w-3xl mx-auto grid gap-10">
        {recs.map((rec, i) => (
          <div
            key={i}
            className="bg-[var(--bg-card)] p-6 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-semibold mb-1">
              {rec.name.fr}
            </h2>

            <p>{rec.description.fr}</p>
            <p className="text-sm italic mt-2">{rec.explanation.fr}</p>

            {/* 🧴 BOUTEILLE */}
            {bottles[i] && (
              <div className="flex gap-4 mt-6 items-center border-t pt-4">
                <img
                  src={bottles[i].image}
                  className="w-24 h-24 object-cover rounded-lg"
                  alt={bottles[i].name}
                />
                <div>
                  <p className="font-semibold">{bottles[i].name}</p>
                  <p className="text-sm">{bottles[i].origin}</p>
                  <p className="text-sm">{bottles[i].description}</p>
                </div>
              </div>
            )}

            {/* 🍸 COCKTAIL + RECETTE */}
            {cocktails[i] && (
              <div className="mt-6 border-t pt-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={cocktails[i]!.strDrinkThumb}
                    className="w-24 h-24 rounded-lg object-cover"
                    alt={cocktails[i]!.strDrink}
                  />

                  <div>
                    <p className="font-semibold">
                      🍸 {cocktails[i]!.strDrink}
                    </p>
                    <button
                      onClick={() =>
                        setOpenRecipe((r) => ({
                          ...r,
                          [i]: !r[i],
                        }))
                      }
                      className="text-sm underline mt-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {openRecipe[i]
                        ? "Masquer la recette ↑"
                        : "Voir la recette ↓"}
                    </button>
                  </div>
                </div>

                {openRecipe[i] && (
                  <div className="mt-4 text-sm">
                    <p className="font-medium mb-2">Ingrédients :</p>
                    <ul className="list-disc ml-5 mb-3">
                      {getIngredients(cocktails[i]!).map((x, idx) => (
                        <li key={idx}>{x}</li>
                      ))}
                    </ul>

                    <p className="font-medium mb-1">Préparation :</p>
                    <p>{cocktails[i]!.strInstructions}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔁 BOUTON QUESTIONNAIRE */}
      <div className="text-center mt-14">
        <a
          href="/questionnaire"
          className="inline-block px-8 py-3 rounded-xl text-white"
          style={{ background: "var(--accent)" }}
        >
          Refaire le questionnaire
        </a>
      </div>
    </main>
  );
}
