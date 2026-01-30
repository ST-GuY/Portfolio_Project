"use client";

import { useState, useEffect } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as "fr" | "en" | null;
    if (stored) setLang(stored);
  }, []);

  function toggleLang() {
    const next = lang === "fr" ? "en" : "fr";
    setLang(next);
    localStorage.setItem("lang", next);
    window.dispatchEvent(new Event("languageChange"));
  }

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-16 z-50 rounded-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:scale-105 transition"
    >
      {lang === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}
    </button>
  );
}
