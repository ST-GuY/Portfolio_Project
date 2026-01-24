"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Appliquer le thème au chargement (priorité à l'utilisateur)
  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  // Toggle manuel
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50
                 bg-white dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700
                 rounded-full p-3 shadow-md
                 hover:scale-105 transition"
      aria-label="Toggle dark mode"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
