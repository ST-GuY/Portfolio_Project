export type AlcoholCategory = {
  key: string;               // clé interne
  label: string;             // affichage UI
  cocktailApiKey: string;    // clé TheCocktailDB
  hasCocktail: boolean;      // vin ≠ spiritueux
};

export const alcoholCategories: AlcoholCategory[] = [
  { key: "gin", label: "Gin", cocktailApiKey: "Gin", hasCocktail: true },
  { key: "vodka", label: "Vodka", cocktailApiKey: "Vodka", hasCocktail: true },
  { key: "rum", label: "Rhum", cocktailApiKey: "Rum", hasCocktail: true },
  { key: "whisky", label: "Whisky", cocktailApiKey: "Whiskey", hasCocktail: true },
  { key: "tequila", label: "Tequila", cocktailApiKey: "Tequila", hasCocktail: true },
  { key: "brandy", label: "Brandy", cocktailApiKey: "Brandy", hasCocktail: true },
  { key: "liqueur", label: "Liqueur", cocktailApiKey: "Amaretto", hasCocktail: true },
  { key: "champagne", label: "Champagne", cocktailApiKey: "Champagne", hasCocktail: true },
  { key: "wine", label: "Vin", cocktailApiKey: "Wine", hasCocktail: false },
  { key: "beer", label: "Bière", cocktailApiKey: "Beer", hasCocktail: false },
];
