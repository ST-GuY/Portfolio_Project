"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lang = "fr" | "en";

const content = {
  fr: {
    title: "Dégust",
    subtitle:
      "Découvrez des alcools adaptés à vos goûts, votre humeur ou votre contexte, grâce à une approche simple, éducative et responsable.",
    button: "Commencer le questionnaire",
  },
  en: {
    title: "Taste",
    subtitle:
      "Discover spirits tailored to your tastes, mood or context through a simple, educational and responsible approach.",
    button: "Start the questionnaire",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("fr");

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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold mb-6">
        {content[lang].title}
        <span className="text-rose-500">&</span>Moi
      </h1>

      <p className="max-w-xl text-neutral-600 dark:text-neutral-300 mb-10">
        {content[lang].subtitle}
      </p>

      <Link
        href="/questionnaire"
        className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-xl transition transform hover:scale-105"
      >
        {content[lang].button}
      </Link>
    </main>
  );
}
