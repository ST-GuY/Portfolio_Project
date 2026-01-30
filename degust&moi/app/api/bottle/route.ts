import { NextResponse } from "next/server";
import { bottles } from "../../../src/data/bottles";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json({ bottle: null });
  }

  // Recherche dans toutes les catégories
  for (const category of Object.values(bottles)) {
    if ((category as any)[type]) {
      return NextResponse.json({
        bottle: (category as any)[type],
      });
    }
  }

  return NextResponse.json({ bottle: null });
}
