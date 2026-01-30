import { bottles } from "@/src/data/bottles";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type || !bottles[type]) {
    return Response.json({ bottle: null });
  }

  return Response.json({ bottle: bottles[type] });
}
