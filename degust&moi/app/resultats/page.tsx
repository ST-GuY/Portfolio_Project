"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { getRecommendations } from "../../src/lib/recommendation";

type Lang = "fr" | "en";

type Drink = {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
};

export default function ResultatsPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Drink | null>>({});

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);

    const stored = localStorage.getItem("degust-moi-answers");
    if (!stored) return;

    const answers = JSON.parse(stored);
    const recs = getRecommendations(answers);
    setRecommendations(recs);

    // 🔁 Fetch cocktails for each recommendation
    recs.forEach(async (rec, index) => {
      const type = rec.type.toLowerCase();
      let apiType = "rum";

      if (type.includes("whisky")) apiType = "whiskey";
      if (type.includes("gin")) apiType = "gin";

      try {
        const res = await fetch(`/api/alcohol?type=${apiType}`);
        const data = await res.json();

        setCocktails((prev) => ({
          ...prev,
          [index]: data.drink ?? null,
        }));
      } catch {
        setCocktails((prev) => ({ ...prev, [index]: null }));
      }
    });
  }, []);

  function toggleLang() {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <ThemeToggle />

      {/* Lang toggle */}
      <button
        onClick={toggleLang}
        className="fixed top-4 left-4 z-50 px-3 py-2 rounded-full border text-sm"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        {lang === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
          {lang === "fr" ? "Vos recommandations" : "Your recommendations"}
        </h1>

        <div className="grid gap-8">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-lg p-6"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <h2 className="text-2xl font-semibold mb-2">
                {rec.name[lang]}
              </h2>

              <p className="mb-2">{rec.description[lang]}</p>

              <p className="text-sm italic mb-4">
                {rec.explanation[lang]}
              </p>

              {/* 🍸 Cocktail */}
              {cocktails[index] && (
                <div className="mt-4 border-t pt-4">
                  <p className="font-medium mb-2">
                    🍸 {lang === "fr" ? "Cocktail suggéré" : "Suggested cocktail"}
                  </p>

                  <div className="flex gap-4 items-center">
                    <img
                      src={cocktails[index]!.strDrinkThumb}
                      alt={cocktails[index]!.strDrink}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-semibold">
                        {cocktails[index]!.strDrink}
                      </p>

                      <p className="text-sm mt-1 opacity-80">
                        {lang === "fr"
                          ? "Recette issue de TheCocktailDB"
                          : "Recipe from TheCocktailDB"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/questionnaire"
            className="inline-block px-8 py-3 rounded-xl text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {lang === "fr"
              ? "Refaire le questionnaire"
              : "Restart questionnaire"}
          </a>
        </div>
      </div>
    </main>
  );
}
