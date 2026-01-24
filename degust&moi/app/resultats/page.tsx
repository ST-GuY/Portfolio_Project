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
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Recommandations</h1>

      {recommendations.map((rec, index) => (
        <div key={index} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{rec.name}</h2>
          <p className="text-sm text-gray-600">{rec.type}</p>
          <p className="mt-2">{rec.description}</p>
          <p className="mt-2 italic text-sm text-gray-500">
            {rec.explanation}
          </p>
        </div>
      ))}
    </main>
  );
}
