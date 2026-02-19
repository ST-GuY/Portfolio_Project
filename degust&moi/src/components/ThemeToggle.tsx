"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem("theme");

    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setDark(false);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      setDark(prefersDark);
    }
  }, []);

  if (!mounted) return null;

  function toggleTheme() {
    const newTheme = !dark;
    setDark(newTheme);

    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Changer le thème"
      className="rounded-full p-3 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg hover:scale-105 transition"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
