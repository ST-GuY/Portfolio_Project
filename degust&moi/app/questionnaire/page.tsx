"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lang = "fr" | "en";

const content = {
  fr: {
    title: "Questionnaire",
    subtitle:
      "Réponds à quelques questions pour découvrir les alcools qui te correspondent.",
    taste: "Préférence de goût",
    intensity: "Intensité souhaitée",
    context: "Contexte",
    options: {
      sweet: "Sucré",
      dry: "Sec",
      fruity: "Fruité",
      light: "Légère",
      medium: "Moyenne",
      strong: "Intense",
      calm: "Soirée calme",
      tasting: "Dégustation",
      aperitif: "Apéritif",
    },
    button: "Voir les recommandations →",
  },
  en: {
    title: "Survey",
    subtitle:
      "Answer a few questions to discover drinks that match your preferences.",
    taste: "Taste preference",
    intensity: "Desired intensity",
    context: "Context",
    options: {
      sweet: "Sweet",
      dry: "Dry",
      fruity: "Fruity",
      light: "Light",
      medium: "Medium",
      strong: "Strong",
      calm: "Calm evening",
      tasting: "Tasting",
      aperitif: "Aperitif",
    },
    button: "See recommendations →",
  },
};

export default function QuestionnairePage() {
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("fr");
  const [answers, setAnswers] = useState({
    sweetness: "",
    intensity: "",
    context: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored) setLang(stored);

    const onLangChange = () => {
      const updated = localStorage.getItem("lang") as Lang | null;
      if (updated) setLang(updated);
    };

    window.addEventListener("languageChange", onLangChange);
    return () => window.removeEventListener("languageChange", onLangChange);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("degust-moi-answers", JSON.stringify(answers));
    router.push("/resultats");
  }

  const t = content[lang];

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {t.title}
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-center text-sm">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Taste */}
          <select
            required
            className="w-full p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
            onChange={(e) =>
              setAnswers({ ...answers, sweetness: e.target.value })
            }
          >
            <option value="">{t.taste}</option>
            <option value="sweet">{t.options.sweet}</option>
            <option value="dry">{t.options.dry}</option>
            <option value="fruity">{t.options.fruity}</option>
          </select>

          {/* Intensity */}
          <select
            required
            className="w-full p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
            onChange={(e) =>
              setAnswers({ ...answers, intensity: e.target.value })
            }
          >
            <option value="">{t.intensity}</option>
            <option value="light">{t.options.light}</option>
            <option value="medium">{t.options.medium}</option>
            <option value="strong">{t.options.strong}</option>
          </select>

          {/* Context */}
          <select
            required
            className="w-full p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
            onChange={(e) =>
              setAnswers({ ...answers, context: e.target.value })
            }
          >
            <option value="">{t.context}</option>
            <option value="calm">{t.options.calm}</option>
            <option value="tasting">{t.options.tasting}</option>
            <option value="aperitif">{t.options.aperitif}</option>
          </select>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl transition"
          >
            {t.button}
          </button>
        </form>
      </div>
    </main>
  );
}
