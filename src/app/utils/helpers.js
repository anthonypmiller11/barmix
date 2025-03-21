import { SCREEN_SIZE } from "./constants";
import { FeaturedCocktails } from "./data";

// 🍸 Organize a single cocktail's data
export const organizeCocktail = (cocktail) => {
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
    const ingredient = cocktail[`strIngredient${index}`];
    const measure = cocktail[`strMeasure${index}`];
    if (!ingredient) break;

    ingredientArray.push({
      name: ingredient,
      measure: measure ? measure : "",
    });
  }

  return { ...cocktailData, ingredients: ingredientArray };
};

// 🍹 Organize a list of cocktails (with optional limit)
export const organizeCocktailList = (cocktails, limit = 0) => {
  const organizedCocktails = [];
  if (cocktails !== null) {
    const sliced = limit > 0 ? cocktails.slice(0, limit) : cocktails;
    sliced.forEach((cocktail) => {
      const data = organizeCocktail(cocktail);
      organizedCocktails.push(data);
    });
  }
  return organizedCocktails;
};

// 🍋 Organize a single ingredient (supports string or object)
export const organizeIngredient = (ingredient) => {
  if (typeof ingredient === "string") {
    return {
      name: ingredient,
      description: "This ingredient is used in multiple cocktails.",
      type: null,
      alcohol: null,
      abv: null,
    };
  }

  return {
    id: ingredient.idIngredient,
    name: ingredient.strIngredient,
    description: ingredient.strDescription,
    type: ingredient.strType,
    alcohol: ingredient.strAlcohol,
    abv: ingredient.strABV,
  };
};

// 🍊 Organize a list of ingredients from your local JSON
export const organizeIngredients = (ingredients) => {
  if (!ingredients || !Array.isArray(ingredients)) return [];
  return ingredients.map((item) => item.trim());
};

// ✨ Get six featured cocktails (randomized)
export const featuredCocktails = () => {
  const shuffled = FeaturedCocktails.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
};

// 🎥 Extract video IDs from YouTube API response
export const youtubeResponseToVideos = (response) => {
  const videoIdList = [];
  if (response !== null) {
    response.forEach((item) => videoIdList.push(item.id.videoId));
  }
  return videoIdList;
};

// 📐 Responsive grid helpers
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

export const calcPopularSlides = (width) => {
  if (width < SCREEN_SIZE.MD) return 1;
  if (width < SCREEN_SIZE.LG) return 2.5;
  if (width < SCREEN_SIZE.XXL) return 4;
  return 5;
};

export const calcIngredientsGrid = (width) => {
  if (width < SCREEN_SIZE.MD) return 3 * 5;
  if (width < SCREEN_SIZE.LG) return 4 * 4;
  if (width < SCREEN_SIZE.XL) return 5 * 4;
  return 5 * 4;
};

export const calcSearchGrid = (width) => {
  if (width < SCREEN_SIZE.MD) return 1 * 4;
  if (width < SCREEN_SIZE.LG) return 2 * 3;
  if (width < SCREEN_SIZE.XL) return 3 * 2;
  return 3 * 2;
};

export const calcVideoWidth = (width) => {
  if (width < SCREEN_SIZE.MD) return width * 0.75 - 20;
  if (width < SCREEN_SIZE.LG) return width * 0.8;
  if (width < SCREEN_SIZE.XL) return width * 0.7;
  return width * 0.6;
};
