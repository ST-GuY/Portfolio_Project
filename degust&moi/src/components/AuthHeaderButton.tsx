"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function AuthHeaderButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!user) {
    return (
      <Link
        href="/auth"
        className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow hover:scale-105 transition"
      >
        🔐 Connexion
      </Link>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow hover:scale-105 transition"
    >
      🚪 Déconnexion
    </button>
  );
}