"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";

/* ================= TYPES ================= */

type Drink = any;

/* ================= COMPONENT ================= */

export default function FavorisPage() {
  const [favorites, setFavorites] = useState<Drink[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  /* ================= AUTH PROTECTION ================= */

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/auth");
        return;
      }

      const currentUser = data.session.user;
      setUser(currentUser);
      loadFavorites(currentUser.id);
    };

    checkSession();
  }, []);

  /* ================= LOAD FAVORITES ================= */

  async function loadFavorites(userId: string) {
    const { data } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId);

    if (data) {
      setFavorites(data.map((item) => item.drink_data));
    }
  }

  /* ================= REMOVE FAVORITE ================= */

  async function removeFavorite(drinkId: string) {
    if (!user) return;

    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("drink_id", drinkId);

    setFavorites((prev) =>
      prev.filter((f) => f.idDrink !== drinkId)
    );
  }

  /* ================= INGREDIENT PARSER ================= */

  function parseIngredients(drink: Drink): string[] {
    const ingredients: string[] = [];

    for (let i = 1; i <= 15; i++) {
      const name = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (name) {
        ingredients.push(measure ? `${name} – ${measure}` : name);
      }
    }

    return ingredients;
  }

  /* ================= UI ================= */

  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-br from-white/40 via-white/20 to-white/40 dark:from-black/25 dark:via-black/10 dark:to-black/25 backdrop-blur-[2px]">
      <div className="max-w-4xl mx-auto space-y-12">

        <h1 className="text-4xl font-bold text-center">
          ❤️ Mes cocktails favoris
        </h1>

        {favorites.length === 0 ? (
          <div className="glass-card text-center space-y-6">
            <p className="text-neutral-700 dark:text-neutral-300">
              Vous n’avez pas encore ajouté de favoris.
            </p>

            <button
              onClick={() => router.push("/questionnaire")}
              className="inline-block px-6 py-3 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition shadow-lg"
            >
              Découvrir des cocktails
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {favorites.map((drink) => (
              <div
                key={drink.idDrink}
                className="glass-card space-y-4"
              >
                <h2 className="text-2xl font-semibold">
                  🍸 {drink.strDrink}
                </h2>

                <button
                  onClick={() => removeFavorite(drink.idDrink)}
                  className="text-sm text-rose-600 hover:underline"
                >
                  ❌ Retirer des favoris
                </button>

                <div className="flex gap-6 items-start">
                  {drink.strDrinkThumb && (
                    <Image
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      width={100}
                      height={100}
                      className="rounded-xl object-cover shadow-md"
                    />
                  )}

                  <div>
                    <ul className="list-disc ml-5 text-sm text-neutral-700 dark:text-neutral-300">
                      {parseIngredients(drink).map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>

                    <p className="text-sm mt-4 italic text-neutral-600 dark:text-neutral-400">
                      {drink.strInstructions}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={() => router.back()}
            className="inline-block px-6 py-3 rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 transition shadow-lg"
          >
            ← Retour
          </button>
        </div>

      </div>
    </main>
  );
}