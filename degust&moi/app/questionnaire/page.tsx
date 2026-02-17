"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomSelect from "../components/CustomSelect";

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

    if (!answers.sweetness || !answers.intensity || !answers.context) {
      return;
    }

    localStorage.setItem("degust-moi-answers", JSON.stringify(answers));
    router.push("/resultats");
  }

  const t = content[lang];

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {t.title}
        </h1>

        <p className="text-neutral-300 mb-8 text-center text-sm">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Taste */}
          <CustomSelect
            placeholder={t.taste}
            options={[
              { value: "sweet", label: t.options.sweet },
              { value: "dry", label: t.options.dry },
              { value: "fruity", label: t.options.fruity },
            ]}
            onChange={(value) =>
              setAnswers({ ...answers, sweetness: value })
            }
          />

          {/* Intensity */}
          <CustomSelect
            placeholder={t.intensity}
            options={[
              { value: "light", label: t.options.light },
              { value: "medium", label: t.options.medium },
              { value: "strong", label: t.options.strong },
            ]}
            onChange={(value) =>
              setAnswers({ ...answers, intensity: value })
            }
          />

          {/* Context */}
          <CustomSelect
            placeholder={t.context}
            options={[
              { value: "calm", label: t.options.calm },
              { value: "tasting", label: t.options.tasting },
              { value: "aperitif", label: t.options.aperitif },
            ]}
            onChange={(value) =>
              setAnswers({ ...answers, context: value })
            }
          />

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
