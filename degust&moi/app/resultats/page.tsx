"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRecommendations } from "../../src/lib/recommendation";
import type { BaseSpirit } from "../../src/lib/recommendation";

/* ================= TYPES ================= */

type Lang = "fr" | "en";

type Recommendation = {
  name: { fr: string; en: string };
  type: string;
  description: { fr: string; en: string };
  explanation: { fr: string; en: string };
  fallbackSpirit: BaseSpirit;
  bottle?: {
    name: { fr: string; en: string };
    origin: { fr: string; en: string };
    description: { fr: string; en: string };
    image: string;
  };
};

type Drink = any;

const FAVORITES_KEY = "degust-moi-favorites";

function getFavorites(): Drink[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

function saveFavorites(favorites: Drink[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export default function ResultatsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Drink[]>>({});
  const [favorites, setFavorites] = useState<Drink[]>([]);
  const [lang, setLang] = useState<Lang>("fr");
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    setFavorites(getFavorites());

    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);

    const onLangChange = () => {
      const updatedLang = localStorage.getItem("lang") as Lang | null;
      if (updatedLang) setLang(updatedLang);
    };

    window.addEventListener("languageChange", onLangChange);

    const storedAnswers = localStorage.getItem("degust-moi-answers");
    if (!storedAnswers) return;

    const answers = JSON.parse(storedAnswers);
    const recos = getRecommendations(answers);
    setRecommendations(recos);

    fetchCocktails(recos);

    return () => {
      window.removeEventListener("languageChange", onLangChange);
    };
  }, []);

  async function fetchCocktails(recos: Recommendation[]) {
    const INGREDIENTS_BY_BASE: Record<BaseSpirit, string[]> = {
      white_rum: ["Light rum"],
      amber_rum: ["Dark rum"],
      gin: ["Gin"],
      vodka: ["Vodka"],
      tequila: ["Tequila", "Blanco tequila", "Reposado tequila"],
      brandy: ["Brandy"],
      whisky: ["Whiskey", "Bourbon", "Scotch", "Rye whiskey"],
      wine: ["Red wine"],
    };

    for (const [index, rec] of recos.entries()) {
      const ingredients = INGREDIENTS_BY_BASE[rec.fallbackSpirit];
      if (!ingredients) continue;

      let drinksFound: any[] | null = null;

      for (const ingredient of ingredients) {
        try {
          const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
              ingredient
            )}`
          );
          const data = await res.json();
          if (data.drinks) {
            drinksFound = data.drinks;
            break;
          }
        } catch {
          continue;
        }
      }

      if (!drinksFound) continue;

      const selected = drinksFound.sort(() => 0.5 - Math.random()).slice(0, 2);

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
    }
  }

  function toggleFavorite(drink: Drink) {
    const exists = favorites.some((f) => f.idDrink === drink.idDrink);
    let updated;

    if (exists) {
      updated = favorites.filter((f) => f.idDrink !== drink.idDrink);
    } else {
      updated = [...favorites, drink];
      setLastAdded(null);
      setTimeout(() => {
        setLastAdded(drink.idDrink);
        setTimeout(() => setLastAdded(null), 600);
      }, 10);
    }

    setFavorites(updated);
    saveFavorites(updated);
    window.dispatchEvent(new Event("favoritesUpdated"));
  }

  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-br from-white/40 via-white/20 to-white/40 dark:from-black/25 dark:via-black/10 dark:to-black/25 backdrop-blur-[2px]">
      <div className="max-w-4xl mx-auto space-y-12">

        <h1 className="text-4xl font-bold tracking-tight">
          {lang === "fr" ? "Vos recommandations" : "Your recommendations"}
        </h1>

        {recommendations.map((rec, index) => {
          const drinks = cocktails[index];

          return (
            <div key={index} className="glass-card space-y-8">

              <div>
                <h2 className="text-2xl font-semibold">
                  {rec.name[lang]}
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 mt-2">
                  {rec.description[lang]}
                </p>
              </div>

              {rec.bottle && (
                <div className="flex gap-6 items-center bg-white/40 dark:bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Image
                    src={rec.bottle.image}
                    alt={rec.bottle.name[lang]}
                    width={90}
                    height={220}
                    className="drop-shadow-lg"
                  />
                  <div>
                    <p className="font-medium text-lg">
                      {rec.bottle.name[lang]}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {rec.bottle.origin[lang]}
                    </p>
                  </div>
                </div>
              )}

              {drinks?.map((drink, i) => {
                const isFavorite = favorites.some(
                  (f) => f.idDrink === drink.idDrink
                );

                const hasFrench = !!drink.strInstructionsFR;

                return (
                  <div
                    key={`${drink.idDrink}-${i}`}
                    className={`pt-6 border-t border-white/20 dark:border-white/10 space-y-4 transition ${
                      lastAdded === drink.idDrink
                        ? "animate-card-pulse"
                        : ""
                    }`}
                  >
                    <h3 className="font-semibold text-lg flex items-center gap-3">
                      🍸 {drink.strDrink}
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                        🌍 {hasFrench ? "FR" : "EN"}
                      </span>
                    </h3>

                    <button
                      onClick={() => toggleFavorite(drink)}
                      className="text-sm flex items-center gap-2"
                    >
                      <span
                        className={`${
                          lastAdded === drink.idDrink
                            ? "animate-heart-pop"
                            : ""
                        }`}
                      >
                        {isFavorite ? "❤️" : "🤍"}
                      </span>

                      {isFavorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"}
                    </button>

                    <div className="flex gap-6 items-start">
                      {drink.strDrinkThumb && (
                        <Image
                          src={drink.strDrinkThumb}
                          alt={drink.strDrink}
                          width={100}
                          height={100}
                          className="rounded-xl object-cover shadow-md"
                        />
                      )}

                      <div>
                        <ul className="list-disc ml-5 text-sm text-neutral-700 dark:text-neutral-300">
                          {parseIngredients(drink).map((ingredient, idx) => (
                            <li key={idx}>{ingredient}</li>
                          ))}
                        </ul>

                        <p className="text-sm mt-4 italic text-neutral-600 dark:text-neutral-400">
                          {lang === "fr" && hasFrench
                            ? drink.strInstructionsFR
                            : drink.strInstructions}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="text-center pt-4">
          <Link
            href="/questionnaire"
            className="inline-block px-8 py-4 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition shadow-lg"
          >
            {lang === "fr"
              ? "Refaire le questionnaire"
              : "Restart questionnaire"}
          </Link>
        </div>

        {lastAdded && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/90 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
            ❤️ Ajouté aux favoris
          </div>
        )}
      </div>
    </main>
  );
}

function parseIngredients(drink: any): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const name = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (name) {
      ingredients.push(measure ? `${name} – ${measure}` : name);
    }
  }
  return ingredients;
}
