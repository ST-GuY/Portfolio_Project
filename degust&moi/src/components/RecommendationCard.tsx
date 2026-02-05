"use client";

import { useEffect, useState } from "react";
import type { Recommendation } from "@/lib/recommendation";

type Drink = any;

export default function RecommendationCard({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const [drink, setDrink] = useState<Drink | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!recommendation.cocktailApiKey) return;

    setLoading(true);

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        recommendation.cocktailApiKey
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDrink(data.drinks?.[0] ?? null);
      })
      .finally(() => setLoading(false));
  }, [recommendation.cocktailApiKey]);

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 space-y-4">
      {/* Alcool */}
      <h3 className="text-xl font-semibold">
        {recommendation.name.fr}
      </h3>

      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {recommendation.description.fr}
      </p>

      {/* Cocktail */}
      {loading && (
        <p className="text-sm italic">Chargement du cocktail…</p>
      )}

      {drink && (
        <div className="mt-4 space-y-2">
          <h4 className="font-semibold">{drink.strDrink}</h4>

          <ul className="text-sm list-disc list-inside">
            {parseIngredients(drink).map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <p className="text-sm italic">
            {drink.strInstructionsFR ??
              drink.strInstructions}
          </p>
        </div>
      )}
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
