"use client";

import { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleUpdatePassword() {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Mot de passe mis à jour !");
      setTimeout(() => router.push("/auth"), 2000);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Nouveau mot de passe
        </h1>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full p-2 rounded bg-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleUpdatePassword}
          className="w-full bg-rose-600 hover:bg-rose-700 p-2 rounded"
        >
          Mettre à jour
        </button>

        {message && (
          <p className="text-sm text-center text-rose-300">{message}</p>
        )}
      </div>
    </main>
  );
}