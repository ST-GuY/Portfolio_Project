import { getRecommendations } from "../src/lib/recommendation";

const answers = {
  sweetness: "fruity",
  intensity: "medium",
  context: "tasting",
};

const recommendations = getRecommendations(answers);

console.log(
  recommendations.map((r) => ({
    name: r.name.fr,
    type: r.type,
    score: r.score,
    bottle: r.bottle?.name.fr,
    cocktail: r.cocktail?.name,
  }))
);
