"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FAVORITES_KEY = "degust-moi-favorites";

export default function FavoritesHeaderButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function updateCount() {
      const stored = localStorage.getItem(FAVORITES_KEY);
      const favorites = stored ? JSON.parse(stored) : [];
      setCount(favorites.length);
    }

    updateCount();

    window.addEventListener("favoritesUpdated", updateCount);

    return () => {
      window.removeEventListener("favoritesUpdated", updateCount);
    };
  }, []);

  return (
    <Link
      href="/favoris"
      className="relative px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow hover:scale-105 transition"
    >
      ❤️

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
