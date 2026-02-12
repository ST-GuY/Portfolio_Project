"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ================= TYPES ================= */

type Drink = any;

const FAVORITES_KEY = "degust-moi-favorites";

/* ================= HELPERS ================= */

function getFavorites(): Drink[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(
    localStorage.getItem(FAVORITES_KEY) || "[]"
  );
}

function saveFavorites(favorites: Drink[]) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

function parseIngredients(drink: Drink): string[] {
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

/* ================= COMPONENT ================= */

export default function FavorisPage() {
  const [favorites, setFavorites] = useState<Drink[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function removeFavorite(id: string) {
    const updated = favorites.filter(
      (f) => f.idDrink !== id
    );

    setFavorites(updated);
    saveFavorites(updated);
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          ❤️ Mes cocktails favoris
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400">
              Vous n’avez pas encore ajouté de favoris.
            </p>

            <Link
              href="/questionnaire"
              className="inline-block px-6 py-3 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition"
            >
              Découvrir des cocktails
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {favorites.map((drink) => (
              <div
                key={drink.idDrink}
                className="rounded-2xl p-6 shadow-lg bg-white dark:bg-neutral-900 space-y-4"
              >
                <h2 className="text-2xl font-semibold">
                  🍸 {drink.strDrink}
                </h2>

                <button
                  onClick={() =>
                    removeFavorite(drink.idDrink)
                  }
                  className="text-sm text-rose-600 hover:underline"
                >
                  ❌ Retirer des favoris
                </button>

                <div className="flex gap-4 items-start">
                  {drink.strDrinkThumb && (
                    <Image
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      width={100}
                      height={100}
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
                      {drink.strInstructions}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
