import { alcohols, Alcohol } from "../data/alcohols";

type Answers = {
  sweetness: string;
  intensity: string;
  context: string;
};

type Recommendation = Alcohol & {
  score: number;
  explanation: string;
};

export function getRecommendations(answers: Answers): Recommendation[] {
  const scoredAlcohols: Recommendation[] = alcohols.map((alcohol) => {
    let score = 0;
    const reasons: string[] = [];

    if (alcohol.sweetness === answers.sweetness) {
      score += 2;
      reasons.push(`goût ${answers.sweetness}`);
    }

    if (alcohol.intensity === answers.intensity) {
      score += 1;
      reasons.push(`intensité ${answers.intensity}`);
    }

    if (alcohol.contexts.includes(answers.context)) {
      score += 1;
      reasons.push(`contexte adapté`);
    }

    return {
      ...alcohol,
      score,
      explanation:
        reasons.length > 0
          ? `Recommandé pour son ${reasons.join(", ")}.`
          : "Recommandation basée sur un profil proche de tes préférences.",
    };
  });

  // Trier tous les alcools par score décroissant
  const sorted = scoredAlcohols.sort((a, b) => b.score - a.score);

  // Priorité aux profils pertinents, sinon on complète
  const withScore = sorted.filter((a) => a.score > 0);

  if (withScore.length >= 3) {
    return withScore.slice(0, 3);
  }

  return sorted.slice(0, 3);
}
