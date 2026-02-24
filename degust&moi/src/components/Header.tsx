"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [lang, setLang] = useState<"fr" | "en">("fr");

  useEffect(() => {
    checkUser();
    loadLang();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) loadFavorites(session.user.id);
      }
    );

    window.addEventListener("favoritesUpdated", refreshFavorites);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("favoritesUpdated", refreshFavorites);
    };
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
      loadFavorites(data.user.id);
    }
  }

  async function loadFavorites(userId: string) {
    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId);

    setFavoritesCount(data?.length ?? 0);
  }

  function refreshFavorites() {
    if (user) loadFavorites(user.id);
  }

  function loadLang() {
    const stored = localStorage.getItem("lang") as "fr" | "en" | null;
    if (stored) setLang(stored);
  }

  function toggleLang(newLang: "fr" | "en") {
    localStorage.setItem("lang", newLang);
    setLang(newLang);
    window.dispatchEvent(new Event("languageChange"));
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <header className="fixed top-6 right-6 z-50 max-w-[90vw]">
      <div className="flex items-center gap-3 px-6 py-3 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">

        {/* Accueil */}
        <Link href="/" className="glass-btn">
          🏠 {lang === "fr" ? "Accueil" : "Home"}
        </Link>

        {/* Favoris */}
        {user && (
          <Link href="/favoris" className="glass-btn relative">
            ❤️
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full animate-badge">
                {favoritesCount}
              </span>
            )}
          </Link>
        )}

        {/* Auth */}
        {user ? (
          <button onClick={logout} className="glass-btn">
            {lang === "fr" ? "Déconnexion" : "Logout"}
          </button>
        ) : (
          <Link href="/auth" className="glass-btn">
            {lang === "fr" ? "Connexion" : "Login"}
          </Link>
        )}

        {/* Lang switch */}
        <div className="flex gap-1 ml-2">
          <button
            onClick={() => toggleLang("fr")}
            className={`glass-btn ${lang === "fr" ? "bg-rose-600/80" : ""}`}
          >
            FR
          </button>
          <button
            onClick={() => toggleLang("en")}
            className={`glass-btn ${lang === "en" ? "bg-rose-600/80" : ""}`}
          >
            EN
          </button>
        </div>

      </div>
    </header>
  );
}