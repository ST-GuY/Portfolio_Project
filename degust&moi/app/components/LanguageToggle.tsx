"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 border rounded-full px-4 py-2 text-sm shadow hover:scale-105 transition"
    >
      {lang === "fr" ? "FR 🇫🇷" : "EN 🇬🇧"}
    </button>
  );
}
