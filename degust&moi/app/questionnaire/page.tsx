"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuestionnairePage() {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    sweetness: "",
    intensity: "",
    context: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("degust-moi-answers", JSON.stringify(answers));
    router.push("/resultats");
  }

  return (
    <main className="min-h-screen flex justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Questionnaire
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <select
            required
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setAnswers({ ...answers, sweetness: e.target.value })
            }
          >
            <option value="">Préférence de goût</option>
            <option value="sweet">Sucré</option>
            <option value="dry">Sec</option>
            <option value="fruity">Fruité</option>
          </select>

          <select
            required
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setAnswers({ ...answers, intensity: e.target.value })
            }
          >
            <option value="">Intensité</option>
            <option value="light">Légère</option>
            <option value="medium">Moyenne</option>
            <option value="strong">Intense</option>
          </select>

          <select
            required
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setAnswers({ ...answers, context: e.target.value })
            }
          >
            <option value="">Contexte</option>
            <option value="calm">Soirée calme</option>
            <option value="tasting">Dégustation</option>
            <option value="aperitif">Apéritif</option>
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded"
          >
            Voir les recommandations
          </button>
        </form>
      </div>
    </main>
  );
}
