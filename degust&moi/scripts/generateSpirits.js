import fs from "fs";

async function generateSpirits() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
  );
  const data = await res.json();

  const rawIngredients = data.drinks.map(
    (d) => d.strIngredient1
  );

  const mapping = {
    "Light rum": "white_rum",
    "White rum": "white_rum",
    "Dark rum": "amber_rum",
    "Spiced rum": "amber_rum",
    "Overproof rum": "amber_rum",

    Vodka: "vodka",
    Gin: "gin",
    Tequila: "tequila",

    Scotch: "whisky",
    Whiskey: "whisky",
    Bourbon: "whisky",
    "Rye whiskey": "whisky",

    Brandy: "brandy",
    Cognac: "brandy",

    "Red wine": "wine",
    "White wine": "wine",
  };

  const spirits = new Set();

  rawIngredients.forEach((ing) => {
    if (mapping[ing]) {
      spirits.add(mapping[ing]);
    }
  });

  fs.writeFileSync(
    "generatedSpirits.json",
    JSON.stringify([...spirits], null, 2)
  );

  console.log("✅ Alcools générés :", [...spirits]);
}

generateSpirits();
