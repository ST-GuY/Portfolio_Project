import fs from "fs";

async function generateSpirits() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
  );
  const data = await res.json();

  const ingredients = data.drinks.map(d => d.strIngredient1);

  const baseSpirits = [];
  const liqueurs = [];
  const others = [];

  ingredients.forEach((ing) => {
    const lower = ing.toLowerCase();

    if (
      lower.includes("vodka") ||
      lower.includes("rum") ||
      lower.includes("gin") ||
      lower.includes("whisk") ||
      lower.includes("tequila") ||
      lower.includes("brandy") ||
      lower.includes("cognac")
    ) {
      baseSpirits.push(ing);
    } else if (
      lower.includes("liqueur") ||
      lower.includes("vermouth") ||
      lower.includes("amaretto") ||
      lower.includes("campari") ||
      lower.includes("aperol") ||
      lower.includes("triple sec") ||
      lower.includes("curaçao")
    ) {
      liqueurs.push(ing);
    } else {
      others.push(ing);
    }
  });

  fs.writeFileSync(
    "generatedAlcohols.json",
    JSON.stringify(
      {
        baseSpirits,
        liqueurs,
        others,
      },
      null,
      2
    )
  );

  console.log("✅ Génération terminée");
  console.log("Base spirits:", baseSpirits.length);
  console.log("Liqueurs:", liqueurs.length);
  console.log("Others:", others.length);
}

generateSpirits();
