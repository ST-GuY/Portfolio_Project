"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

type Lang = "fr" | "en";

const TEXTS = {
  fr: {
    title: "Authentification",
    email: "Email",
    password: "Mot de passe",
    forgot: "Mot de passe oublié ?",
    signup: "S'inscrire",
    signin: "Se connecter",
    logout: "Se déconnecter",
    connected: "Connecté en tant que",
    resetRequired: "Entre ton email pour recevoir le lien.",
    resetSent: "📩 Email de réinitialisation envoyé !",
  },
  en: {
    title: "Authentication",
    email: "Email",
    password: "Password",
    forgot: "Forgot password?",
    signup: "Sign up",
    signin: "Sign in",
    logout: "Logout",
    connected: "Logged in as",
    resetRequired: "Enter your email to receive the link.",
    resetSent: "📩 Reset email sent!",
  },
};

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState<Lang>("fr");
  const router = useRouter();

  const t = TEXTS[lang];

  /* ================= CHECK USER ================= */

  useEffect(() => {
    checkUser();

    const storedLang = localStorage.getItem("lang") as Lang | null;
    if (storedLang) setLang(storedLang);

    const handleLanguageChange = () => {
      const updatedLang = localStorage.getItem("lang") as Lang | null;
      if (updatedLang) setLang(updatedLang);
    };

    window.addEventListener("languageChange", handleLanguageChange);

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
      window.removeEventListener("languageChange", handleLanguageChange);
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

  /* ================= RESET PASSWORD ================= */

  async function handleForgotPassword() {
    if (!email) {
      setMessage(t.resetRequired);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(t.resetSent);
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
        <h1 className="text-2xl font-bold text-center">{t.title}</h1>

        {user ? (
          <>
            <p className="text-center">
              {t.connected} <strong>{user.email}</strong>
            </p>

            <button
              onClick={handleLogout}
              className="w-full bg-neutral-500 hover:bg-neutral-600 p-2 rounded"
            >
              {t.logout}
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder={t.email}
              className="w-full p-2 rounded bg-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder={t.password}
              className="w-full p-2 rounded bg-white/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleForgotPassword}
              className="text-sm text-neutral-300 hover:text-white transition text-left"
            >
              {t.forgot}
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleSignUp}
                className="flex-1 bg-rose-600 hover:bg-rose-700 p-2 rounded"
              >
                {t.signup}
              </button>

              <button
                onClick={handleSignIn}
                className="flex-1 bg-neutral-700 hover:bg-neutral-800 p-2 rounded"
              >
                {t.signin}
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