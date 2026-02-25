"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRecommendations } from "../../src/lib/recommendation";
import type { BaseSpirit } from "../../src/lib/spiritMapping";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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

export default function ResultatsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Drink[]>>({});
  const [favorites, setFavorites] = useState<Drink[]>([]);
  const [lang, setLang] = useState<Lang>("fr");
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  /* ================= AUTH + LOAD FAVORITES ================= */

  async function loadFavorites(userId: string) {
    const { data } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId);

    if (data) {
      setFavorites(data.map((item) => item.drink_data));
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/auth");
        return;
      }

      const currentUser = data.session.user;
      setUser(currentUser);
      loadFavorites(currentUser.id);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/auth");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* ================= LANGUAGE + RECOMMENDATIONS ================= */

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);

    const storedAnswers = localStorage.getItem("degust-moi-answers");
    if (!storedAnswers) return;

    const answers = JSON.parse(storedAnswers);
    const recos = getRecommendations(answers);
    setRecommendations(recos);

    fetchCocktails(recos);
  }, []);

  /* ================= FETCH COCKTAILS ================= */

  async function fetchCocktails(recos: Recommendation[]) {
    const INGREDIENTS_BY_BASE: Record<BaseSpirit, string[]> = {
  /* 🍹 RUM */
  white_rum: ["Light rum", "White rum"],
  amber_rum: ["Dark rum", "Spiced rum", "Gold rum"],

  /* 🥃 WHISKY */
  whisky: ["Whiskey", "Scotch", "Rye whiskey", "Blended whiskey"],
  bourbon: ["Bourbon"],

  /* 🍸 CLEAR SPIRITS */
  vodka: ["Vodka"],
  gin: ["Gin"],
  tequila: ["Tequila", "Blanco tequila", "Reposado tequila"],

  /* 🥃 BRANDY */
  brandy: ["Brandy", "Cognac", "Armagnac"],

  /* 🍷 WINE & FORTIFIED */
  wine: ["Red wine", "White wine", "Sherry"],
  vermouth: ["Vermouth", "Sweet Vermouth", "Dry Vermouth"],

  /* 🍾 SPARKLING */
  champagne: ["Champagne", "Prosecco"],

  /* 🍹 LIQUEURS */
  liqueur: [
    "Triple Sec",
    "Amaretto",
    "Baileys",
    "Coffee liqueur",
    "Kahlua",
  ],
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

  /* ================= FAVORITES ================= */

  async function toggleFavorite(drink: Drink) {
    if (!user) {
      alert("Connecte-toi pour ajouter des favoris.");
      return;
    }

    const exists = favorites.some((f) => f.idDrink === drink.idDrink);

    if (exists) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("drink_id", drink.idDrink);

      setFavorites((prev) =>
        prev.filter((f) => f.idDrink !== drink.idDrink)
      );
    } else {
      await supabase.from("favorites").insert({
        user_id: user.id,
        drink_id: drink.idDrink,
        drink_data: drink,
      });

      setFavorites((prev) => [...prev, drink]);

      setLastAdded(null);
      setTimeout(() => {
        setLastAdded(drink.idDrink);
        setTimeout(() => setLastAdded(null), 600);
      }, 10);
    }
  }

  /* ================= UI ================= */

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">

        <h1 className="text-4xl font-bold tracking-tight">
          {lang === "fr" ? "Vos recommandations" : "Your recommendations"}
        </h1>

        {recommendations.map((rec, index) => {
          const drinks = cocktails[index];

          return (
            <div key={index} className="glass-card space-y-8">

              {/* TITRE + DESCRIPTION */}
              <div>
                <h2 className="text-2xl font-semibold">
                  {rec.name[lang]}
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 mt-2">
                  {rec.description[lang]}
                </p>
              </div>

              {/* IMAGE BOUTEILLE */}
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

              {/* COCKTAILS */}
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
                    } ${isFavorite ? "favorite-glow" : ""}`}
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
                          width={120}
                          height={120}
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

        {lastAdded && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900/90 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
            ❤️ Ajouté aux favoris
          </div>
        )}

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

      </div>
    </main>
  );
}

/* ================= INGREDIENT PARSER ================= */

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