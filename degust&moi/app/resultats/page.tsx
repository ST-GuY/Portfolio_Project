"use client";

import { useEffect, useState } from "react";
import { getRecommendations } from "../../src/lib/recommendation";

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
    <main className="min-h-screen pb-28 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Vos recommandations
        </h1>

        <div className="grid gap-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{rec.name}</h2>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {rec.type}
                </span>
              </div>

              <p className="text-gray-700 mt-3">{rec.description}</p>

              <p className="mt-4 text-sm italic text-gray-500">
                {rec.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton toujours visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-3xl mx-auto text-center">
          <a
            href="/questionnaire"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg"
          >
            Refaire le questionnaire
          </a>
        </div>
      </div>
    </main>
  );
}
