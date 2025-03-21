// src/app/utils/data.js
export const topLevelCategories = ["Spirits", "Mood", "Strength", "Occasion"];

export const subCategories = {
  Spirits: ["Tequila", "Gin", "Vodka", "Rum", "Whiskey"],
  Mood: ["Relaxing", "Energetic", "Festive", "Romantic"],
  Strength: ["Light", "Medium", "Strong"],
  Occasion: ["Party", "Dinner", "Casual", "Celebration"],
};

export const alcoholicTypes = ["Alcoholic", "Non alcoholic", "Optional alcohol"];
export const categoryTypes = ["Cocktail", "Shot", "Punch / Party Drink"];
export const glassTypes = ["Cocktail glass", "Highball glass", "Old-fashioned glass"];
export const Menu = [
  { menu: "Home", link: "/" },
  { menu: "Alcoholic", link: "/alcoholic" },
  { menu: "Categories", link: "/categories" },
  { menu: "Glasses", link: "/glasses" },
  { menu: "Ingredients", link: "/ingredients" },
];
