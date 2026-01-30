"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  if (!mounted) return null;

  function toggleTheme() {
    const isDark = !dark;
    setDark(isDark);

    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Changer le thème"
      className="fixed top-4 right-4 z-50 rounded-full p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow hover:scale-105 transition"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
