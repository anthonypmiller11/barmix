export const alcoholicTypes = ["Alcoholic", "Non alcoholic", "Optional alcohol"];

export const ingredientCategories = [
  "Vodka Drinks",
  "Gin Drinks",
  "Tequila Drinks",
  "Rum Drinks",
  "Whiskey Drinks",
  "Brandy Drinks",
  "Liqueur Drinks",
  "Non-Alcoholic Drinks"
];

export const ingredientMapping = {
  "Vodka Drinks": ["Absolut Vodka", "Smirnoff Vodka"],
  "Gin Drinks": ["Tanqueray Gin"],
  "Tequila Drinks": ["Patron Tequila", "Jose Cuervo Tequila"],
  "Rum Drinks": ["Bacardi White Rum", "Captain Morgan Rum", "Coconut Rum"],
  "Whiskey Drinks": ["Crown Royal Whiskey", "Jack Daniels Whiskey", "Irish Whiskey", "Rye Whiskey"],
  "Brandy Drinks": ["Hennessy Cognac", "Brandy"],
  "Liqueur Drinks": [
    "Grand Marnier", "Cointreau", "Triple Sec", "Amaretto", "Kahlua", "Coffee Liqueur",
    "Chambord Raspberry Liqueur", "Maraschino Liqueur", "Aperol", "Campari", "Green Chartreuse",
    "Jägermeister", "Peach Schnapps", "Irish Cream"
  ],
  "Non-Alcoholic Drinks": [
    "Lemon Juice", "Lime Juice", "Orange Juice", "Pineapple Juice", "Grapefruit Juice",
    "Cranberry Juice", "Tomato Juice", "Tonic Water", "Ginger Beer", "Lemon Lime Soda",
    "Coca Cola", "Soda Water", "Grenadine", "Simple Syrup", "Honey Syrup", "Orgeat Syrup",
    "Passion Fruit Syrup", "Raspberry Syrup", "Lemon Syrup", "Chocolate Syrup"
  ]
};

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
