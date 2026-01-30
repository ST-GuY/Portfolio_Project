"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRecommendations } from "../../src/lib/recommendation";

/* ================= TYPES ================= */

type Lang = "fr" | "en";

type TextI18n = {
  fr: string;
  en: string;
};

type Bottle = {
  name: TextI18n;
  origin: TextI18n;
  description: TextI18n;
  image: string;
};

type Cocktail = {
  name: string;
  image: string;
  ingredients: string[];
  instructions: TextI18n;
};

type Recommendation = {
  name: TextI18n;
  type: string;
  description: TextI18n;
  explanation: TextI18n;
  bottle?: Bottle;
  cocktail?: Cocktail;
};

/* ================= COMPONENT ================= */

export default function ResultatsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [lang, setLang] = useState<Lang>("fr");

useEffect(() => {
  // 🔹 Charger la langue
  const storedLang = localStorage.getItem("lang") as Lang | null;
  if (storedLang) setLang(storedLang);

  const onLangChange = () => {
    const updatedLang = localStorage.getItem("lang") as Lang | null;
    if (updatedLang) setLang(updatedLang);
  };

  window.addEventListener("languageChange", onLangChange);

  // 🔹 Charger les réponses du questionnaire
  const storedAnswers = localStorage.getItem("degust-moi-answers");
  if (storedAnswers) {
    const answers = JSON.parse(storedAnswers);
    const recos = getRecommendations(answers);
    console.log("RECOMMENDATIONS:", recos);
    setRecommendations(recos);
  }

  return () => window.removeEventListener("languageChange", onLangChange);
}, []);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-12 transition-colors">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-12">
          {lang === "fr" ? "Vos recommandations" : "Your recommendations"}
        </h1>

        <div className="space-y-10">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="
                rounded-2xl p-6 shadow-lg
                bg-white dark:bg-neutral-900
                text-neutral-900 dark:text-neutral-100
                animate-fade-in
              "
            >
              {/* TITLE */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold">
                  {rec.name[lang]}
                </h2>
                <span className="text-xs px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800">
                  {rec.type}
                </span>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400">
                {rec.description[lang]}
              </p>

              <p className="mt-2 italic text-sm text-neutral-500">
                {rec.explanation[lang]}
              </p>

              <hr className="my-6 border-neutral-200 dark:border-neutral-700" />

              {/* BOTTLE */}
              {rec.bottle && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">
                    🍾 {lang === "fr" ? "Bouteille suggérée" : "Suggested bottle"}
                  </h3>

                  <div className="flex gap-4 items-center">
                    <Image
                      src={rec.bottle.image}
                      alt={rec.bottle.name[lang]}
                      width={80}
                      height={200}
                      className="object-contain"
                    />

                    <div>
                      <p className="font-medium">
                        {rec.bottle.name[lang]}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {rec.bottle.origin[lang]}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {rec.bottle.description[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* COCKTAIL */}
              {rec.cocktail && (
                <div>
                  <h3 className="font-semibold mb-3">
                    🍸 {lang === "fr" ? "Cocktail associé" : "Associated cocktail"}
                  </h3>

                  <div className="flex gap-4 items-start">
                    <Image
                      src={rec.cocktail.image}
                      alt={rec.cocktail.name}
                      width={90}
                      height={90}
                      className="rounded-lg"
                    />

                    <div>
                      <p className="font-medium">{rec.cocktail.name}</p>

                      <ul className="list-disc ml-5 text-sm mt-2 text-neutral-600 dark:text-neutral-400">
                        {rec.cocktail.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>

                      <p className="text-sm mt-3 text-neutral-600 dark:text-neutral-400">
                        {rec.cocktail.instructions[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center mt-16">
          <Link
            href="/questionnaire"
            className="
              inline-block px-8 py-4 rounded-xl
              bg-rose-600 text-white
              hover:bg-rose-500
              dark:bg-rose-500 dark:hover:bg-rose-400
              transition
            "
          >
            {lang === "fr" ? "Refaire le questionnaire" : "Restart questionnaire"}
          </Link>
        </div>

        <p className="text-xs text-center text-neutral-500 mt-10">
          {lang === "fr"
            ? "Les exemples sont fournis à titre pédagogique. L’abus d’alcool est dangereux pour la santé."
            : "Examples are provided for educational purposes. Alcohol abuse is dangerous for your health."}
        </p>
      </div>
    </main>
  );
}
