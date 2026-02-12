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

/* ================= FAVORITES STORAGE ================= */

const FAVORITES_KEY = "degust-moi-favorites";

function getFavorites(): Drink[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

function saveFavorites(favorites: Drink[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/* ================= COMPONENT ================= */

export default function ResultatsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Drink[]>>({});
  const [favorites, setFavorites] = useState<Drink[]>([]);
  const [lang, setLang] = useState<Lang>("fr");

  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [badgeAnimate, setBadgeAnimate] = useState(false);

  /* ================= INITIAL LOAD ================= */

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

    return () =>
      window.removeEventListener("languageChange", onLangChange);
  }, []);

  /* ================= COCKTAIL DISCOVERY ================= */

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

    const pickRandom = <T,>(array: T[], count: number): T[] =>
      [...array].sort(() => Math.random() - 0.5).slice(0, count);

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

      const selected = pickRandom(drinksFound, 2);

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

  /* ================= FAVORITE TOGGLE ================= */

  function toggleFavorite(drink: Drink) {
    const exists = favorites.some((f) => f.idDrink === drink.idDrink);

    let updated;

    if (exists) {
      updated = favorites.filter((f) => f.idDrink !== drink.idDrink);
    } else {
      updated = [...favorites, drink];

      setLastAdded(drink.idDrink);
      setBadgeAnimate(true);

      setTimeout(() => {
        setLastAdded(null);
        setBadgeAnimate(false);
      }, 800);
    }

    setFavorites(updated);
    saveFavorites(updated);
  }

  /* ================= RENDER ================= */

  return (
    <main
      className="
        min-h-screen
        px-4
        py-12
        bg-gradient-to-br
        from-white/40 via-white/20 to-white/40
        dark:from-black/25 dark:via-black/10 dark:to-black/25
        backdrop-blur-[2px]
      "
    >
      <div className="max-w-4xl mx-auto relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            {lang === "fr"
              ? "Vos recommandations"
              : "Your recommendations"}
          </h1>

          <Link
            href="/favoris"
            className="
              relative
              bg-white/80 dark:bg-white/5
              backdrop-blur-md
              border border-white/20 dark:border-white/10
              px-4 py-2 rounded-xl
              shadow-lg
              hover:scale-105 transition
              flex items-center gap-2
            "
          >
            ❤️ Favoris
            {favorites.length > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full ${
                  badgeAnimate ? "animate-badge" : ""
                }`}
              >
                {favorites.length}
              </span>
            )}
          </Link>
        </div>

        <div className="space-y-12">
          {recommendations.map((rec, index) => {
            const drinks = cocktails[index];

            return (
              <div
                key={index}
                className="
                  rounded-2xl
                  p-8
                  shadow-2xl
                  bg-white/80 dark:bg-white/5
                  backdrop-blur-md
                  border border-white/20 dark:border-white/10
                  space-y-8
                "
              >
                <div>
                  <h2 className="text-2xl font-semibold">
                    {rec.name[lang]}
                  </h2>
                  <p className="text-neutral-700 dark:text-neutral-300 mt-2">
                    {rec.description[lang]}
                  </p>
                </div>

                {rec.bottle && (
                  <div className="flex gap-6 items-center">
                    <Image
                      src={rec.bottle.image}
                      alt={rec.bottle.name[lang]}
                      width={90}
                      height={220}
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

                  return (
                    <div
                      key={`${drink.idDrink}-${i}`}
                      className="pt-6 border-t border-white/20 dark:border-white/10 space-y-4"
                    >
                      <h3 className="font-semibold text-lg">
                        🍸 {drink.strDrink}
                      </h3>

                      <button
                        onClick={() => toggleFavorite(drink)}
                        className="text-sm flex items-center gap-2 hover:opacity-80 transition"
                      >
                        {isFavorite ? "❤️" : "🤍"}
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
                            {parseIngredients(drink).map(
                              (ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                              )
                            )}
                          </ul>

                          <p className="text-sm mt-4 italic text-neutral-600 dark:text-neutral-400">
                            {lang === "fr"
                              ? drink.strInstructionsFR ??
                                drink.strInstructions
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
        </div>

        <div className="text-center mt-16">
          <Link
            href="/questionnaire"
            className="inline-block px-8 py-4 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-xl hover:scale-105 transition"
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
      ingredients.push(measure ? `${name} – ${measure}` : name);
    }
  }

  return ingredients;
}
