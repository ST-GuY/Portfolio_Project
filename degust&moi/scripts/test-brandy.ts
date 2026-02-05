import { normalizeSpirit } from "../src/lib/spiritMapping";

const ingredients = [
  "Brandy",
  "Cognac",
  "Armagnac",
  "Apple brandy",
  "Bitters",
  "Sugar",
  "Water",
];

const baseSpirits = ingredients
  .map(normalizeSpirit)
  .filter(Boolean);

console.log("Ingredients:", ingredients);
console.log("Base spirits detected:", baseSpirits);
