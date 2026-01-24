"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";

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
      <ThemeToggle />

      <div
        className="rounded-2xl shadow-xl p-8 w-full max-w-md"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">
          Questionnaire
        </h1>

        <p
          className="mb-8 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Réponds à quelques questions pour recevoir jusqu’à 3 recommandations
          adaptées à tes goûts.
        </p>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Goût */}
          <select
            required
            className="w-full border p-3 rounded-lg bg-transparent"
            onChange={(e) =>
              setAnswers({ ...answers, sweetness: e.target.value })
            }
          >
            <option value="">Préférence de goût</option>
            <option value="sweet">Sucré</option>
            <option value="dry">Sec</option>
            <option value="fruity">Fruité</option>
          </select>

          {/* Intensité */}
          <select
            required
            className="w-full border p-3 rounded-lg bg-transparent"
            onChange={(e) =>
              setAnswers({ ...answers, intensity: e.target.value })
            }
          >
            <option value="">Intensité</option>
            <option value="light">Légère</option>
            <option value="medium">Moyenne</option>
            <option value="strong">Intense</option>
          </select>

          {/* Contexte */}
          <select
            required
            className="w-full border p-3 rounded-lg bg-transparent"
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
            className="w-full py-3 rounded-xl text-white font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Voir les recommandations →
          </button>
        </form>
      </div>
    </main>
  );
}
