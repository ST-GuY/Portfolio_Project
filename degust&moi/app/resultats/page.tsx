"use client";

import { useEffect, useState } from "react";
import { getRecommendations } from "../../src/lib/recommendation";
import ThemeToggle from "../components/ThemeToggle";

type Recommendation = {
  name: string;
  type: string;
  description: string;
  explanation: string;
};

export default function ResultatsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("degust-moi-answers");
    if (stored) {
      const answers = JSON.parse(stored);
      setRecommendations(getRecommendations(answers));
    }
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 pb-28">
      <ThemeToggle />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Vos recommandations
        </h1>

        <div className="grid gap-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              style={{
                animationDelay: `${index * 120}ms`,
                backgroundColor: "var(--bg-card)",
              }}
              className="rounded-2xl shadow-md p-6 opacity-0 animate-fade-in hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold">
                  {rec.name}
                </h2>

                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    color: "var(--accent)",
                    backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)",
                  }}
                >
                  {rec.type}
                </span>
              </div>

              <p className="mt-2">
                {rec.description}
              </p>

              <p
                className="mt-4 text-sm italic"
                style={{ color: "var(--text-muted)" }}
              >
                {rec.explanation}
              </p>
            </div>
          ))}
        </div>
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
