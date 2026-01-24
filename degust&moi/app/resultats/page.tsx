"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { getRecommendations } from "../../src/lib/recommendation";

/* =======================
   Types
======================= */

type Recommendation = {
  name: string;
  type: string;
  description: string;
  explanation: string;
};

type DrinkExample = {
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
};

/* =======================
   Utils
======================= */

function mapAlcoholType(type: string) {
  switch (type.toLowerCase()) {
    case "rhum":
      return "rum";
    case "whisky":
      return "whiskey";
    case "gin":
      return "gin";
    default:
      return "rum";
  }
}

/* =======================
   Page
======================= */

export default function ResultatsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [examples, setExamples] = useState<Record<number, DrinkExample | null>>(
    {}
  );

  useEffect(() => {
    const stored = localStorage.getItem("degust-moi-answers");

    if (!stored) return;

    const answers = JSON.parse(stored);
    const recs = getRecommendations(answers);
    setRecommendations(recs);

    recs.forEach(async (rec, index) => {
      try {
        const apiType = mapAlcoholType(rec.type);
        const res = await fetch(`/api/alcohol?type=${apiType}`);
        const data = await res.json();

        setExamples((prev) => ({
          ...prev,
          [index]: data.drink ?? null,
        }));
      } catch (error) {
        setExamples((prev) => ({
          ...prev,
          [index]: null,
        }));
      }
    });
  }, []);

  return (
    <main className="min-h-screen px-4 py-10 pb-32">
      <ThemeToggle />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Vos recommandations
        </h1>

        <div className="grid gap-8">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "var(--bg-card)",
                animationDelay: `${index * 120}ms`,
              }}
              className="rounded-2xl shadow-lg p-6 opacity-0 animate-fade-in hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">
                  {rec.name}
                </h2>

                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    color: "var(--accent)",
                    backgroundColor:
                      "color-mix(in srgb, var(--accent) 15%, transparent)",
                  }}
                >
                  {rec.type}
                </span>
              </div>

              {/* Description */}
              <p className="mt-2">
                {rec.description}
              </p>

              <p
                className="mt-4 text-sm italic"
                style={{ color: "var(--text-muted)" }}
              >
                {rec.explanation}
              </p>

              {/* Exemple API */}
              {examples[index] && (
                <div className="mt-6 border-t pt-4">
                  <p
                    className="text-sm mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Exemple représentatif :
                  </p>

                  <div className="flex gap-4 items-center">
                    <img
                      src={examples[index]!.strDrinkThumb}
                      alt={examples[index]!.strDrink}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-medium">
                        {examples[index]!.strDrink}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {examples[index]!.strAlcoholic}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message responsable */}
        <p
          className="mt-12 text-xs text-center"
          style={{ color: "var(--text-muted)" }}
        >
          Les exemples présentés sont fournis à titre informatif et pédagogique.
          L’abus d’alcool est dangereux pour la santé.
        </p>
      </div>

      {/* Bouton fixe */}
      <div
        className="fixed bottom-0 left-0 right-0 border-t p-4"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <a
            href="/questionnaire"
            className="inline-block px-8 py-3 rounded-xl text-white transition hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Refaire le questionnaire
          </a>
        </div>
      </div>
    </main>
  );
}
