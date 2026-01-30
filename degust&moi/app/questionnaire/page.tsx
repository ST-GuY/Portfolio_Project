"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";

type Lang = "fr" | "en";

export default function QuestionnairePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("fr");

  const [answers, setAnswers] = useState({
    sweetness: "",
    intensity: "",
    context: "",
  });

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);
  }, []);

  function toggleLang() {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("degust-moi-answers", JSON.stringify(answers));
    router.push("/resultats");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <ThemeToggle />

      {/* Lang toggle */}
      <button
        onClick={toggleLang}
        className="fixed top-4 left-4 z-50 px-3 py-2 rounded-full border text-sm"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        {lang === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
      </button>

      <div
        className="rounded-2xl shadow-lg p-8 w-full max-w-md"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">
          {lang === "fr" ? "Questionnaire" : "Questionnaire"}
        </h1>

        <p className="text-sm mb-8 text-center">
          {lang === "fr"
            ? "Réponds à quelques questions pour découvrir les alcools qui te correspondent."
            : "Answer a few questions to discover drinks that match your preferences."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sweetness */}
          <select
            required
            className="w-full border p-3 rounded-lg bg-transparent"
            onChange={(e) =>
              setAnswers({ ...answers, sweetness: e.target.value })
            }
          >
            <option value="">
              {lang === "fr" ? "Préférence de goût" : "Taste preference"}
            </option>
            <option value="sweet">
              {lang === "fr" ? "Sucré" : "Sweet"}
            </option>
            <option value="dry">
              {lang === "fr" ? "Sec" : "Dry"}
            </option>
            <option value="fruity">
              {lang === "fr" ? "Fruité" : "Fruity"}
            </option>
          </select>

          {/* Intensity */}
          <select
            required
            className="w-full border p-3 rounded-lg bg-transparent"
            onChange={(e) =>
              setAnswers({ ...answers, intensity: e.target.value })
            }
          >
            <option value="">
              {lang === "fr" ? "Intensité" : "Intensity"}
            </option>
            <option value="light">
              {lang === "fr" ? "Légère" : "Light"}
            </option>
            <option value="medium">
              {lang === "fr" ? "Moyenne" : "Medium"}
            </option>
            <option value="strong">
              {lang === "fr" ? "Intense" : "Strong"}
            </option>
          </select>

          {/* Context */}
          <select
            required
            className="w-full border p-3 rounded-lg bg-transparent"
            onChange={(e) =>
              setAnswers({ ...answers, context: e.target.value })
            }
          >
            <option value="">
              {lang === "fr" ? "Contexte" : "Context"}
            </option>
            <option value="calm">
              {lang === "fr" ? "Soirée calme" : "Calm evening"}
            </option>
            <option value="tasting">
              {lang === "fr" ? "Dégustation" : "Tasting"}
            </option>
            <option value="aperitif">
              {lang === "fr" ? "Apéritif" : "Aperitif"}
            </option>
          </select>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {lang === "fr"
              ? "Voir les recommandations →"
              : "See recommendations →"}
          </button>
        </form>
      </div>
    </main>
  );
}
