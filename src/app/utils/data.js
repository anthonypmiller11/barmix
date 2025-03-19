export const alcoholicTypes = ["Alcoholic", "Non alcoholic", "Optional alcohol"];

export const categoryTypes = [
  "Cocktail",
  "Ordinary Drink",
  "Shot",
  "Punch / Party Drink",
  "Beer",
  "Soft Drink",
  "Other / Unknown",
  "Coffee / Tea",
  "Homemade Liqueur",
  "Milk / Float / Shake",
  "Cocoa"
];

export const glassTypes = [
  "Highball glass",
  "Cocktail glass",
  "Old-fashioned glass",
  "Whiskey Glass",
  "Collins glass",
  "Pint glass",
  "Shot glass",
  "Martini glass",
  "Margarita glass",
  "Hurricane glass",
  "Champagne flute"
];

export const Menu = [
  { menu: "Home", link: "/" },
  { menu: "Alcoholic", link: "/alcoholic" },
  { menu: "Categories", link: "/categories" },
  { menu: "Glasses", link: "/glasses" },
  { menu: "Ingredients", link: "/ingredients" },
];

export const FeaturedCocktails = [
  { id: "11007", name: "Margarita" },
  { id: "11000", name: "Mojito" },
  { id: "11118", name: "Old Fashioned" },
  { id: "17222", name: "A1" },
  { id: "11001", name: "Negroni" },
  { id: "11003", name: "Whiskey Sour" },
  { id: "11008", name: "Dry Martini" },
  { id: "11002", name: "Daiquiri" },
  { id: "11005", name: "Manhattan" },
  { id: "11004", name: "Cosmopolitan" },
  { id: "11006", name: "Bloody Mary" },
  { id: "11009", name: "Pina Colada" },
];

export const DummyCocktail = {
  id: "0",
  drink: "Loading...",
  category: "Loading...",
  tags: null,
  IBA: null,
  alcoholic: "Loading...",
  glass: "Loading...",
  instructions: "Loading...",
  image: "/images/cocktails/placeholder.jpg",
  ingredients: [
    { name: "Loading...", measure: "Loading..." },
    { name: "Loading...", measure: "Loading..." },
  ],
};

export const Quotes = [
  {
    quote: "There are two kinds of people I don’t trust: people who don’t drink and people who collect stickers.",
    author: "Chelsea Handler",
  },
  {
    quote: "I drink to make other people more interesting.",
    author: "Ernest Hemingway",
  },
  {
    quote: "Here’s to alcohol, the rose colored glasses of life.",
    author: "F. Scott Fitzgerald",
  },
  {
    quote: "A drink a day keeps the shrink away.",
    author: "Edward Abbey",
  },
  {
    quote: "I feel bad for people who don’t drink. When they wake up in the morning, that’s as good as they’re going to feel all day.",
    author: "Frank Sinatra",
  },
];
