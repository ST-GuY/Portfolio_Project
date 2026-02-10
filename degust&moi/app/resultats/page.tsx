"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRecommendations } from "../../src/lib/recommendation";

/* ================= TYPES ================= */

type Lang = "fr" | "en";

type Recommendation = {
  name: { fr: string; en: string };
  type: string;
  description: { fr: string; en: string };
  explanation: { fr: string; en: string };
  bottle?: {
    name: { fr: string; en: string };
    origin: { fr: string; en: string };
    description: { fr: string; en: string };
    image: string;
  };
};

type Drink = any;

/* ================= COMPONENT ================= */

export default function ResultatsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Drink[]>>({});
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    /* ---------- LANG ---------- */
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);

    const onLangChange = () => {
      const updatedLang = localStorage.getItem("lang") as Lang | null;
      if (updatedLang) setLang(updatedLang);
    };
    window.addEventListener("languageChange", onLangChange);

    /* ---------- ANSWERS / RECO ---------- */
    const storedAnswers = localStorage.getItem("degust-moi-answers");
    if (!storedAnswers) return;

    const answers = JSON.parse(storedAnswers);
    const recos = getRecommendations(answers);
    setRecommendations(recos);

    /* ---------- COCKTAIL DISCOVERY API ---------- */

    // 🔑 INGREDIENTS ÉLARGIS (FIX WHISKY)
    const INGREDIENTS_BY_SPIRIT: Record<string, string[]> = {
      "White rum": ["Light rum"],
      "Dry gin": ["Gin"],
      Vodka: ["Vodka"],
      Tequila: ["Tequila"],
      Cognac: ["Brandy"],

      // 👇 LE POINT CLÉ
      "Scotch whisky": [
        "Whiskey",
        "Bourbon",
        "Scotch",
        "Rye whiskey",
      ],
    };

    const pickRandom = <T,>(array: T[], count: number): T[] =>
      [...array].sort(() => Math.random() - 0.5).slice(0, count);

    recos.forEach(async (rec, index) => {
      if (!rec.bottle) return;

      const ingredients =
        INGREDIENTS_BY_SPIRIT[rec.bottle.name.en];
      if (!ingredients?.length) return;

      // 👉 on choisit UN ingrédient au hasard
      const ingredient =
        ingredients[Math.floor(Math.random() * ingredients.length)];

      try {
        // 1️⃣ Liste de cocktails par ingrédient
        const listRes = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
            ingredient
          )}`
        );
        const listData = await listRes.json();
        if (!listData.drinks) return;

        // 2️⃣ On choisit 2 cocktails au hasard
        const selected = pickRandom(listData.drinks, 2);

        // 3️⃣ On récupère les recettes complètes
        const detailed = await Promise.all(
          selected.map((d: any) =>
            fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${d.idDrink}`
            )
              .then((res) => res.json())
              .then((data) => data.drinks?.[0] ?? null)
          )
        );

        setCocktails((prev) => ({
          ...prev,
          [index]: detailed.filter(Boolean),
        }));
      } catch (e) {
        console.error("Cocktail API error", e);
      }
    });

    return () =>
      window.removeEventListener("languageChange", onLangChange);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {lang === "fr"
            ? "Vos recommandations"
            : "Your recommendations"}
        </h1>

        <div className="space-y-12">
          {recommendations.map((rec, index) => {
            const drinks = cocktails[index];

            return (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-lg bg-white dark:bg-neutral-900 space-y-6"
              >
                {/* ALCOOL */}
                <div>
                  <h2 className="text-2xl font-semibold">
                    {rec.name[lang]}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {rec.description[lang]}
                  </p>
                </div>

                {/* BOTTLE */}
                {rec.bottle && (
                  <div className="flex gap-4 items-center">
                    <Image
                      src={rec.bottle.image}
                      alt={rec.bottle.name[lang]}
                      width={80}
                      height={200}
                    />
                    <div>
                      <p className="font-medium">
                        {rec.bottle.name[lang]}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {rec.bottle.origin[lang]}
                      </p>
                    </div>
                  </div>
                )}

                {/* COCKTAILS */}
                {drinks?.map((drink, i) => (
                  <div
                    key={`${drink.idDrink}-${i}`}
                    className="border-t pt-4 space-y-3"
                  >
                    <h3 className="font-semibold flex items-center gap-2">
                      🍸 {drink.strDrink}
                      {lang === "fr" && (
                        <span className="text-xs opacity-70">
                          🌍 EN
                        </span>
                      )}
                    </h3>

                    <p className="text-xs text-neutral-500 italic">
                      {lang === "fr"
                        ? "Recette originale (EN)"
                        : "Original recipe"}
                    </p>

                    <div className="flex gap-4 items-start">
                      {drink.strDrinkThumb && (
                        <Image
                          src={drink.strDrinkThumb}
                          alt={drink.strDrink}
                          width={90}
                          height={90}
                          className="rounded-lg object-cover"
                        />
                      )}

                      <div>
                        <ul className="list-disc ml-5 text-sm">
                          {parseIngredients(drink).map(
                            (ingredient, idx) => (
                              <li key={idx}>{ingredient}</li>
                            )
                          )}
                        </ul>

                        <p className="text-sm mt-3 italic">
                          {lang === "fr"
                            ? drink.strInstructionsFR ??
                              drink.strInstructions
                            : drink.strInstructions}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/questionnaire"
            className="inline-block px-8 py-4 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition"
          >
            {lang === "fr"
              ? "Refaire le questionnaire"
              : "Restart questionnaire"}
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ================= HELPERS ================= */

function parseIngredients(drink: any): string[] {
  const ingredients: string[] = [];

  for (let i = 1; i <= 15; i++) {
    const name = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (name) {
      ingredients.push(
        measure ? `${name} – ${measure}` : name
      );
    }
  }

  return ingredients;
}
