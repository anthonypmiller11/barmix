import { SCREEN_SIZE } from "./constants";
import { FeaturedCocktails } from "./data";

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
    if (
      cocktail["strIngredient" + index] === null ||
      cocktail["strIngredient" + index] === ""
    ) {
      break;
    }

    ingredientArray.push({
      name: cocktail["strIngredient" + index],
      measure: cocktail["strMeasure" + index]
        ? `${cocktail["strMeasure" + index]} ml`
        : "",
    });
  }

  return { ...cocktailData, ingredients: ingredientArray };
};

export const organizeCocktailList = (cocktails, limit = 0) => {
  const organizedCocktails = [];
  if (cocktails !== null) {
    if (limit > 0) {
      cocktails.forEach((cocktail, index) => {
        if (index < limit) {
          const data = organizeCocktail(cocktail);
          organizedCocktails.push(data);
        }
      });
    } else {
      cocktails.forEach((cocktail) => {
        const data = organizeCocktail(cocktail);
        organizedCocktails.push(data);
      });
    }
  }
  return organizedCocktails;
};

export const organizeIngredient = (ingredient) => {
  return {
    name: ingredient,
    imageSmall: `/images/ingredients/${ingredient.replace(/\s+/g, "_")}-small.png`,
    imageMedium: `/images/ingredients/${ingredient.replace(/\s+/g, "_")}-medium.png`,
    image: `/images/ingredients/${ingredient.replace(/\s+/g, "_")}.png`,
  };
};

export const organizeIngredients = (ingredients) => {
  const organizedIngredients = [];
  if (ingredients !== null) {
    ingredients.forEach((item) => {
      const data = organizeIngredient(item);
      organizedIngredients.push(data);
    });
  }
  return organizedIngredients;
};

export const featuredCocktails = () => {
  const shuffled = FeaturedCocktails.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
};

export const calcHomeCocktailGrid = (width) => {
  if (width < SCREEN_SIZE.MD) {
    return 2 * 3;
  }
  if (width < SCREEN_SIZE.LG) {
    return 3 * 3;
  }
  if (width < SCREEN_SIZE.XL) {
    return 4 * 2;
  }
  return 5 * 2;
};

export const calcOtherCocktailGrid = (width) => {
  if (width < SCREEN_SIZE.MD) {
    return 2 * 5;
  }
  if (width < SCREEN_SIZE.LG) {
    return 3 * 4;
  }
  if (width < SCREEN_SIZE.XL) {
    return 4 * 3;
  }
  return 5 * 3;
};

export const calcPopularSlides = (width) => {
  if (width < SCREEN_SIZE.MD) {
    return 1;
  }
  if (width < SCREEN_SIZE.LG) {
    return 2.5;
  }
  if (width < SCREEN_SIZE.XXL) {
    return 4;
  }
  return 5;
};

export const calcIngredientsGrid = (width) => {
  if (width < SCREEN_SIZE.MD) {
    return 3 * 5;
  }
  if (width < SCREEN_SIZE.LG) {
    return 4 * 4;
  }
  if (width < SCREEN_SIZE.XL) {
    return 5 * 4;
  }
  return 5 * 4;
};

export const calcSearchGrid = (width) => {
  if (width < SCREEN_SIZE.MD) {
    return 1 * 4;
  }
  if (width < SCREEN_SIZE.LG) {
    return 2 * 3;
  }
  if (width < SCREEN_SIZE.XL) {
    return 3 * 2;
  }
  return 3 * 2;
};

export const calcVideoWidth = (width) => {
  if (width < SCREEN_SIZE.MD) {
    return (width * 0.75) - 20;
  }
  if (width < SCREEN_SIZE.LG) {
    return width * 0.8;
  }
  if (width < SCREEN_SIZE.XL) {
    return width * 0.7;
  }
  return width * 0.6;
};

export const containsIngredient = (cocktail, ingredients) => {
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    if (ingredient && ingredients.includes(ingredient.trim())) {
      return true;
    }
  }
  return false;
};
