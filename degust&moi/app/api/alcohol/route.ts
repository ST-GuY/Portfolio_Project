import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json(
      { error: "Missing alcohol type" },
      { status: 400 }
    );
  }

  // Appel TheCocktailDB
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${type}`
  );

  const data = await response.json();

  // On retourne seulement le premier résultat (exemple)
  const drink = data.drinks?.[0] ?? null;

  return NextResponse.json({ drink });
}
