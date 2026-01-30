export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type) {
    return Response.json({ drink: null });
  }

  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${type}`
  );
  const data = await res.json();

  if (!data.drinks || data.drinks.length === 0) {
    return Response.json({ drink: null });
  }

  const drinkId = data.drinks[0].idDrink;

  const detailRes = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
  );
  const detailData = await detailRes.json();

  return Response.json({ drink: detailData.drinks[0] });
}
