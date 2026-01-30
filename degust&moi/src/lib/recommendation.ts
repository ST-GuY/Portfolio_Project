import { alcohols, Alcohol } from "../data/alcohols";

type Answers = {
  sweetness: string;
  intensity: string;
  context: string;
};

type Recommendation = Alcohol & {
  score: number;
  explanation: {
    fr: string;
    en: string;
  };
};

export function getRecommendations(
  answers: Answers
): Recommendation[] {
  const scored = alcohols.map((alcohol) => {
    let score = 0;
    const reasonsFr: string[] = [];
    const reasonsEn: string[] = [];

    if (alcohol.sweetness === answers.sweetness) {
      score += 2;
      reasonsFr.push(`goût ${answers.sweetness}`);
      reasonsEn.push(`${answers.sweetness} taste`);
    }

    if (alcohol.intensity === answers.intensity) {
      score += 1;
      reasonsFr.push(`intensité ${answers.intensity}`);
      reasonsEn.push(`${answers.intensity} intensity`);
    }

    if (alcohol.contexts.includes(answers.context)) {
      score += 1;
      reasonsFr.push("contexte adapté");
      reasonsEn.push("suitable context");
    }

    return {
      ...alcohol,
      score,
      explanation: {
        fr:
          reasonsFr.length > 0
            ? `Recommandé pour son ${reasonsFr.join(", ")}.`
            : "Profil proche de vos préférences.",
        en:
          reasonsEn.length > 0
            ? `Recommended for its ${reasonsEn.join(", ")}.`
            : "Profile close to your preferences.",
      },
    };
  });

  return scored
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
