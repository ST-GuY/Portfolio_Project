"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { getRecommendations } from "../../src/lib/recommendation";

type Lang = "fr" | "en";

type Cocktail = {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | null;
};

type Bottle = {
  name: string;
  origin: string;
  description: string;
  image: string;
};

/* =======================
   Helpers
======================= */

function getIngredients(drink: Cocktail) {
  const list: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ing) list.push(measure ? `${measure} ${ing}` : ing);
  }
  return list;
}

function translateInstructions(text: string) {
  return "Mélanger les ingrédients avec de la glace, filtrer dans un verre adapté et servir frais.";
}

/* =======================
   Page
======================= */

export default function ResultatsPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [cocktails, setCocktails] = useState<Record<number, Cocktail | null>>({});
  const [bottles, setBottles] = useState<Record<number, Bottle | null>>({});
  const [openRecipe, setOpenRecipe] = useState<Record<number, boolean>>({});
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);

    const stored = localStorage.getItem("degust-moi-answers");
    if (!stored) return;

    const answers = JSON.parse(stored);
    const recs = getRecommendations(answers);
    setRecommendations(recs);

    recs.forEach((_, i) => {
      setTimeout(() => setVisible((v) => [...v, i]), i * 120);
    });

    recs.forEach(async (rec, index) => {
      const type = rec.type.toLowerCase();

      let cocktailType: string | null = null;
      let bottleType: string | null = null;

      if (type.includes("whisky")) {
        cocktailType = "whiskey"; // API cocktail
        bottleType = "whisky";    // local bottle
      } else if (type.includes("rhum")) {
        cocktailType = "rum";
        bottleType = "rum";
      } else if (type.includes("gin")) {
        cocktailType = "gin";
        bottleType = "gin";
      } else if (type.includes("tequila")) {
        cocktailType = "tequila";
        bottleType = "tequila";
      } else if (type.includes("vin")) {
        bottleType = "vin-rouge";
        // ❌ pas de cocktail pour le vin
      }

      if (bottleType) {
        const bottleRes = await fetch(`/api/bottle?type=${bottleType}`);
        const bottleData = await bottleRes.json();
        setBottles((b) => ({ ...b, [index]: bottleData.bottle ?? null }));
      }

      if (cocktailType) {
        const cocktailRes = await fetch(`/api/alcohol?type=${cocktailType}`);
        const cocktailData = await cocktailRes.json();
        setCocktails((c) => ({ ...c, [index]: cocktailData.drink ?? null }));
      }
    });
  }, []);

  function toggleLang() {
    const next = lang === "fr" ? "en" : "fr";
    setLang(next);
    localStorage.setItem("lang", next);
  }

  return (
    <main className="min-h-screen px-4 py-10 pb-32">
      <ThemeToggle />

      <button
        onClick={toggleLang}
        className="fixed top-4 left-4 z-50 px-3 py-2 rounded-full border text-sm"
        style={{ background: "var(--bg-card)" }}
      >
        {lang === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {lang === "fr" ? "Vos recommandations" : "Your recommendations"}
        </h1>

        <div className="grid gap-10">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className={`rounded-2xl shadow-lg p-6 transition-all duration-500
                ${visible.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ background: "var(--bg-card)" }}
            >
              <h2 className="text-2xl font-semibold mb-1">{rec.name[lang]}</h2>
              <p>{rec.description[lang]}</p>
              <p className="text-sm italic mt-2">{rec.explanation[lang]}</p>

              {/* 🧴 BOUTEILLE */}
              {bottles[i] && (
                <div className="mt-6 border-t pt-4">
                  <p className="font-medium mb-2">🧴 Bouteille suggérée</p>
                  <div className="flex gap-4 items-center">
                    <img
                      src={bottles[i]!.image}
                      className="w-24 h-24 rounded-lg object-cover"
                      alt={bottles[i]!.name}
                    />
                    <div>
                      <p className="font-semibold">{bottles[i]!.name}</p>
                      <p className="text-sm">Origine : {bottles[i]!.origin}</p>
                      <p className="text-sm">{bottles[i]!.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 🍸 COCKTAIL */}
              {cocktails[i] && (
                <div className="mt-6 border-t pt-4">
                  <p className="font-medium mb-2">🍸 Cocktail associé</p>

                  <div className="flex gap-4 items-center">
                    <img
                      src={cocktails[i]!.strDrinkThumb}
                      className="w-24 h-24 rounded-lg object-cover"
                      alt={cocktails[i]!.strDrink}
                    />
                    <div>
                      <p className="font-semibold">{cocktails[i]!.strDrink}</p>
                      <button
                        onClick={() =>
                          setOpenRecipe((r) => ({ ...r, [i]: !r[i] }))
                        }
                        className="text-sm underline mt-1"
                        style={{ color: "var(--accent)" }}
                      >
                        {openRecipe[i] ? "Masquer la recette ↑" : "Voir la recette ↓"}
                      </button>
                    </div>
                  </div>

                  {openRecipe[i] && (
                    <div className="mt-4 text-sm">
                      <p className="font-medium mb-2">Ingrédients :</p>
                      <ul className="list-disc ml-5 mb-3">
                        {getIngredients(cocktails[i]!).map((x, idx) => (
                          <li key={idx}>{x}</li>
                        ))}
                      </ul>

                      <p className="font-medium mb-1">Préparation :</p>
                      <p>
                        {lang === "fr"
                          ? translateInstructions(cocktails[i]!.strInstructions)
                          : cocktails[i]!.strInstructions}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="/questionnaire"
            className="inline-block px-8 py-3 rounded-xl text-white"
            style={{ background: "var(--accent)" }}
          >
            {lang === "fr" ? "Refaire le questionnaire" : "Restart questionnaire"}
          </a>
        </div>
      </div>
    </main>
  );
}
