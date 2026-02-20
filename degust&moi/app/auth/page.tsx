"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  /* ================= CHECK USER ================= */

  useEffect(() => {
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          router.push("/questionnaire");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser(data.user);
      router.push("/questionnaire");
    }
  }

  /* ================= SIGN UP ================= */

  async function handleSignUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/questionnaire");
    }
  }

  /* ================= SIGN IN ================= */

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/questionnaire");
    }
  }

  /* ================= LOGOUT ================= */

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  /* ================= UI ================= */

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Authentification</h1>

        {user ? (
          <>
            <p className="text-center">
              Connecté en tant que <strong>{user.email}</strong>
            </p>

            <button
              onClick={handleLogout}
              className="w-full bg-neutral-500 hover:bg-neutral-600 p-2 rounded"
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full p-2 rounded bg-white/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={handleSignUp}
                className="flex-1 bg-rose-600 hover:bg-rose-700 p-2 rounded"
              >
                S'inscrire
              </button>

              <button
                onClick={handleSignIn}
                className="flex-1 bg-neutral-700 hover:bg-neutral-800 p-2 rounded"
              >
                Se connecter
              </button>
            </div>
          </>
        )}

        {message && (
          <p className="text-sm text-center text-rose-300">{message}</p>
        )}
      </div>
    </main>
  );
}