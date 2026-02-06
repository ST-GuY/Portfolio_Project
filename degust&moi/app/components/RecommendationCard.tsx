"use client";

import { useEffect, useState } from "react";
import type { Recommendation } from "../../src/lib/recommendation";

/* ================= TYPES ================= */

type Drink = any;

/* ================= COMPONENT ================= */

export default function RecommendationCard({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!recommendation.cocktailApiKeys?.length) return;

    setIsLoading(true);

    Promise.all(
      recommendation.cocktailApiKeys.map((cocktailName) =>
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            cocktailName
          )}`
        )
          .then((res) => res.json())
          .then((data) => data.drinks?.[0] ?? null)
      )
    )
      .then((results) => {
        setDrinks(results.filter(Boolean));
      })
      .finally(() => setIsLoading(false));
  }, [recommendation.cocktailApiKeys]);

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 space-y-4">
      {/* ALCOOL */}
      <h3 className="text-xl font-semibold">
        {recommendation.name.fr}
      </h3>

      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {recommendation.description.fr}
      </p>

      {/* LOADING */}
      {isLoading && (
        <p className="text-sm italic">
          Chargement des cocktails…
        </p>
      )}

      {/* COCKTAILS */}
      {drinks.map((drink, index) => (
        <div
          key={`${drink.idDrink}-${index}`}
          className="mt-4 space-y-2 border-t pt-3"
        >
          <h4 className="font-semibold">
            🍸 {drink.strDrink}
          </h4>

          <ul className="text-sm list-disc list-inside">
            {parseIngredients(drink).map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>

          <p className="text-sm italic">
            {drink.strInstructionsFR ??
              drink.strInstructions}
          </p>
        </div>
      ))}
    </div>
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
