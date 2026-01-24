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
        <h1 className="text-3xl font-bold mb-8 text-center">
          Vos recommandations
        </h1>

        <div className="grid gap-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 120}ms` }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border
                         opacity-0 animate-fade-in
                         hover:shadow-lg hover:-translate-y-1
                         transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{rec.name}</h2>
                <span className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {rec.type}
                </span>
              </div>

              <p className="mt-3">{rec.description}</p>

              <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
                {rec.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton fixe */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t p-4">
        <div className="max-w-3xl mx-auto text-center">
          <a
            href="/questionnaire"
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded transition"
          >
            Refaire le questionnaire
          </a>
        </div>
      </div>
    </main>
  );
}
