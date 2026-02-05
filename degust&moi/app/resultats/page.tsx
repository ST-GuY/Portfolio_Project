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
  cocktailApiKey?: string;
};

/* ================= COMPONENT ================= */

export default function ResultatsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, any>>({});
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);

    const onLangChange = () => {
      const updatedLang = localStorage.getItem("lang") as Lang | null;
      if (updatedLang) setLang(updatedLang);
    };
    window.addEventListener("languageChange", onLangChange);

    const storedAnswers = localStorage.getItem("degust-moi-answers");
    if (storedAnswers) {
      const answers = JSON.parse(storedAnswers);
      const recos = getRecommendations(answers);
      setRecommendations(recos);

      // 🔹 FETCH API POUR CHAQUE COCKTAIL
      recos.forEach((rec, index) => {
        if (!rec.cocktailApiKey) return;

        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            rec.cocktailApiKey
          )}`
        )
          .then((res) => res.json())
          .then((data) => {
            setCocktails((prev) => ({
              ...prev,
              [index]: data.drinks?.[0] ?? null,
            }));
          });
      });
    }

    return () =>
      window.removeEventListener("languageChange", onLangChange);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {lang === "fr" ? "Vos recommandations" : "Your recommendations"}
        </h1>

        <div className="space-y-10">
          {recommendations.map((rec, index) => {
            const drink = cocktails[index];

            return (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-lg bg-white dark:bg-neutral-900"
              >
                <h2 className="text-2xl font-semibold">
                  {rec.name[lang]}
                </h2>

                <p className="text-neutral-600 dark:text-neutral-400">
                  {rec.description[lang]}
                </p>

                {/* BOTTLE */}
                {rec.bottle && (
                  <div className="mt-6 flex gap-4 items-center">
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
                      <p className="text-sm">
                        {rec.bottle.origin[lang]}
                      </p>
                    </div>
                  </div>
                )}

                {/* COCKTAIL */}
        {drink && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">
            🍸 {drink.strDrink}
          </h3>

          <div className="flex gap-4 items-start">
            {/* IMAGE DU COCKTAIL */}
            {drink.strDrinkThumb && (
              <Image
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                width={90}
                height={90}
                className="rounded-lg object-cover"
              />
            )}

            {/* TEXTE */}
            <div>
              <ul className="list-disc ml-5 text-sm">
                {parseIngredients(drink).map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>

              <p className="text-sm mt-3 italic">
                {drink.strInstructionsFR ??
                  drink.strInstructions}
              </p>
            </div>
          </div>
        </div>
      )}

              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/questionnaire"
            className="inline-block px-8 py-4 rounded-xl bg-rose-600 text-white"
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
