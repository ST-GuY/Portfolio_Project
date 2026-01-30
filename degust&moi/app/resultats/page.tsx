"use client";

import { useEffect, useState } from "react";
import { getRecommendations } from "@/src/lib/recommendation";
import { alcoholCategories } from "@/src/data/alcoholCategories";
import ThemeToggle from "../components/ThemeToggle";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../context/LanguageContext";

type Cocktail = {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | null;
};

export default function ResultatsPage() {
  const { lang } = useLanguage();

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Cocktail | null>>({});
  const [bottles, setBottles] = useState<Record<number, any>>({});
  const [openRecipe, setOpenRecipe] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem("degust-moi-answers");
    if (!stored) return;

    const answers = JSON.parse(stored);
    const recs = getRecommendations(answers);
    setRecommendations(recs);

    recs.forEach(async (rec, index) => {
      const category = alcoholCategories.find(
        (c) => c.key === rec.type
      );
      if (!category) return;

      // 🍾 bouteille
      const bottleRes = await fetch(`/api/bottle?type=${category.key}`);
      const bottleData = await bottleRes.json();
      setBottles((prev) => ({ ...prev, [index]: bottleData.bottle }));

      // 🍸 cocktail + recette
      if (category.hasCocktail) {
        const cocktailRes = await fetch(
          `/api/alcohol?type=${category.cocktailApiKey}`
        );
        const cocktailData = await cocktailRes.json();
        setCocktails((prev) => ({ ...prev, [index]: cocktailData.drink }));
      }
    });
  }, []);

  function getIngredients(drink: Cocktail) {
    const list: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        list.push(measure ? `${measure} ${ingredient}` : ingredient);
      }
    }
    return list;
  }

  return (
    <main className="min-h-screen px-4 py-10 pb-32 bg-[var(--bg)]">
      <ThemeToggle />
      <LanguageToggle />

      <h1 className="text-4xl font-bold text-center mb-12">
        {lang === "fr" ? "Vos recommandations" : "Your recommendations"}
      </h1>

      <div className="max-w-3xl mx-auto grid gap-10">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-[var(--bg-card)] rounded-2xl shadow p-6 animate-fade-in"
          >
            <h2 className="text-2xl font-semibold mb-1">
              {rec.name[lang]}
            </h2>

            <p>{rec.description[lang]}</p>

            <p className="text-sm italic mt-2">
              {rec.explanation[lang]}
            </p>

            {/* 🍾 BOUTEILLE */}
            {bottles[index] && (
              <div className="flex gap-4 items-center mt-6 border-t pt-4">
                <img
                  src={bottles[index].image}
                  alt={bottles[index].name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {bottles[index].name[lang]}
                  </p>
                  <p className="text-sm">
                    {bottles[index].origin[lang]}
                  </p>
                  <p className="text-sm">
                    {bottles[index].description[lang]}
                  </p>
                </div>
              </div>
            )}

            {/* 🍸 COCKTAIL */}
            {cocktails[index] && (
              <div className="mt-6 border-t pt-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={cocktails[index]!.strDrinkThumb}
                    alt={cocktails[index]!.strDrink}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      🍸 {cocktails[index]!.strDrink}
                    </p>
                    <button
                      onClick={() =>
                        setOpenRecipe((prev) => ({
                          ...prev,
                          [index]: !prev[index],
                        }))
                      }
                      className="text-sm underline mt-1 text-[var(--accent)]"
                    >
                      {openRecipe[index]
                        ? lang === "fr"
                          ? "Masquer la recette ↑"
                          : "Hide recipe ↑"
                        : lang === "fr"
                        ? "Voir la recette ↓"
                        : "View recipe ↓"}
                    </button>
                  </div>
                </div>

                {openRecipe[index] && (
                  <div className="mt-4 text-sm">
                    <p className="font-medium mb-2">
                      {lang === "fr" ? "Ingrédients :" : "Ingredients:"}
                    </p>
                    <ul className="list-disc ml-5 mb-3">
                      {getIngredients(cocktails[index]!).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    <p className="font-medium mb-1">
                      {lang === "fr" ? "Préparation :" : "Preparation:"}
                    </p>
                    <p className="italic opacity-80">
                      {lang === "fr"
                        ? cocktails[index]!.strInstructions
                        : cocktails[index]!.strInstructions}
                    </p>

                    <p className="text-xs mt-2 opacity-60">
                      {lang === "fr"
                        ? "ℹ️ Recette fournie par TheCocktailDB (anglais uniquement)."
                        : "ℹ️ Recipe provided by TheCocktailDB (English only)."}
                    </p>

                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔁 RESTART */}
      <div className="text-center mt-16">
        <a
          href="/questionnaire"
          className="inline-block px-8 py-3 rounded-xl text-white bg-[var(--accent)] hover:scale-105 transition"
        >
          {lang === "fr"
            ? "Refaire le questionnaire"
            : "Restart questionnaire"}
        </a>
      </div>

      <p className="text-xs text-center mt-10 opacity-70">
        {lang === "fr"
          ? "Les exemples présentés sont fournis à titre informatif et pédagogique. L’abus d’alcool est dangereux pour la santé."
          : "Examples are provided for educational purposes only. Alcohol abuse is dangerous for your health."}
      </p>
    </main>
  );
}
