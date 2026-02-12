"use client";

import { useEffect, useState } from "react";

type Lang = "fr" | "en";

export default function LanguageToggle() {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored) setLang(stored);
  }, []);

  function changeLang(newLang: Lang) {
    localStorage.setItem("lang", newLang);
    window.dispatchEvent(new Event("languageChange"));
    setLang(newLang);
  }

  return (
    <div className="flex items-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-full p-1 shadow-md">
      <button
        onClick={() => changeLang("fr")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
          lang === "fr"
            ? "bg-rose-600 text-white shadow"
            : "text-neutral-600 dark:text-neutral-300 hover:text-rose-600"
        }`}
      >
        FR
      </button>

      <button
        onClick={() => changeLang("en")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
          lang === "en"
            ? "bg-rose-600 text-white shadow"
            : "text-neutral-600 dark:text-neutral-300 hover:text-rose-600"
        }`}
      >
        EN
      </button>
    </div>
  );
}
