import { SCREEN_SIZE } from "./constants";
import cocktailRecipes from "../../data/cocktail_recipes.json"; // Adjusted path to match directory structure

// 🍸 Organize a single cocktail from API or JSON
export const organizeCocktail = (cocktail) => {
  console.log("Organizing cocktail:", cocktail); // Log the cocktail being organized
  const cocktailData = {
    id: cocktail.idDrink,
    drink: cocktail.strDrink,
    category: cocktail.strCategory,
    tags: cocktail.strTags,
    IBA: cocktail.strIBA,
    alcoholic: cocktail.strAlcoholic,
    glass: cocktail.strGlass,
    instructions: cocktail.strInstructions,
    image: cocktail.strDrinkThumb,
  };

  const ingredientArray = [];
  for (let index = 1; index <= 15; index++) {
    if (
      cocktail["strIngredient" + index] === null ||
      cocktail["strIngredient" + index] === ""
    ) {
      break;
    }

    ingredientArray.push({
      name: cocktail["strIngredient" + index],
      measure: cocktail["strMeasure" + index] || "",
    });
  }

  return { ...cocktailData, ingredients: ingredientArray };
};

// 🍹 Organize a cocktail list (limit optional)
export const organizeCocktailList = (cocktails, limit = 24) => {
  if (!Array.isArray(cocktails)) {
    throw new Error("Invalid data: cocktails must be an array"); // Handle invalid input
  }

  return cocktails.slice(0, limit).map((cocktail) => ({
    id: cocktail.idDrink,
    name: cocktail.strDrink,
    image: cocktail.strDrinkThumb,
  }));
};

// 🍋 Organize a single ingredient (supports string or object)
export const organizeIngredient = (ingredient) => {
  if (typeof ingredient === "string") {
    return {
      name: ingredient,
      type: null,
      abv: null,
      alcohol: null,
      image: `../images/ingredients/${ingredient.replace(/\s+/g, "_")}-medium.png`,
    };
  }

  return {
    id: ingredient.idIngredient,
    name: ingredient.strIngredient,
    description: ingredient.strDescription,
    type: ingredient.strType,
    alcohol: ingredient.strAlcohol,
    abv: ingredient.strABV,
    image: `../images/ingredients/${ingredient.strIngredient.replace(/\s+/g, "_")}-medium.png`,
  };
};

// 🧾 Organize an array of ingredient items into display-ready data
export const organizeIngredients = (ingredients) => {
  if (!ingredients) return [];
  return ingredients.map((item) => organizeIngredient(item));
};

// 🎯 Select featured cocktails randomly
export const featuredCocktails = () => {
  if (!cocktailRecipes || !cocktailRecipes.drinks) {
    console.error("featuredCocktails: No cocktail data available.");
    return [];
  }

  const shuffled = cocktailRecipes.drinks.sort(() => 0.5 - Math.random()); // Use cocktailRecipes.drinks instead of undefined 'data'
  return shuffled.slice(0, 6);
};

// 📺 Format YouTube API response to just video IDs
export const youtubeResponseToVideos = (response) => {
  const videoIdList = [];
  if (response !== null) {
    response.forEach((item) => videoIdList.push(item.id.videoId));
  }
  return videoIdList;
};

// 📐 Grid and layout utilities based on screen width
export const calcHomeCocktailGrid = (width) => {
  if (width < SCREEN_SIZE.MD) return 2 * 3;
  if (width < SCREEN_SIZE.LG) return 3 * 3;
  if (width < SCREEN_SIZE.XL) return 4 * 2;
  return 5 * 2;
};

export const calcOtherCocktailGrid = (width) => {
  if (width < SCREEN_SIZE.MD) return 2 * 5;
  if (width < SCREEN_SIZE.LG) return 3 * 4;
  if (width < SCREEN_SIZE.XL) return 4 * 3;
  return 5 * 3;
};

export const calcIngredientsGrid = (width) => {
  if (width < SCREEN_SIZE.MD) return 3 * 5;
  if (width < SCREEN_SIZE.LG) return 4 * 4;
  if (width < SCREEN_SIZE.XL) return 5 * 4;
  return 5 * 4;
};

// Ensure only one definition of calcSearchGrid exists:
export const calcSearchGrid = (size) => {
  const data = size.width > 768 ? { columns: 4 } : { columns: 2 };
  return data;
};

export const calcVideoWidth = (width) => {
  if (width < SCREEN_SIZE.MD) return width * 0.75 - 20;
  if (width < SCREEN_SIZE.LG) return width * 0.8;
  if (width < SCREEN_SIZE.XL) return width * 0.7;
  return width * 0.6;
};

export const calcMaxItems = (items, max) => {
  if (!Array.isArray(items)) {
    console.error("calcMaxItems: 'items' is not an array.");
    return [];
  }
  return items.slice(0, max);
};
