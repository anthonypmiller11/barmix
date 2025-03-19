import React from "react";
import { useDispatch } from "react-redux";
import { showIngredientModal } from "../../app/features/modalSlice";
import { setIngredient } from "../../app/features/aboutIngredientSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AboutCocktail = ({ cocktail, loading }) => {
  const dispatch = useDispatch();

  const ingredientsList = [];
  for (let i = 1; i <= 8; i++) {
    if (cocktail?.[`strIngredient${i}`]) {
      const ingrName = cocktail[`strIngredient${i}`].trim();
      const imageBase = ingrName.replace(/\s+/g, "_");
      const measure = cocktail[`strMeasure${i}`] ? `${cocktail[`strMeasure${i}`]} ml` : "";
      ingredientsList.push({
        name: ingrName,
        measure: measure,
        imageSmall: `/images/ingredients/${imageBase}-small.png`,
        imageMedium: `/images/ingredients/${imageBase}-medium.png`,
        image: `/images/ingredients/${imageBase}.png`,
      });
    }
  }

  const onIngredientClick = (ingredient) => {
    dispatch(setIngredient({ strIngredient1: ingredient.name, imageMedium: ingredient.imageMedium }));
    dispatch(showIngredientModal());
  };

  return (
    <div className="w-full flex flex-col justify-start mb-8">
      <p className="font-app-quote text-app-cadet text-[22px] md:text-[24px] lg:text-[28px] xl:text-[32px] text-center mb-2 md:mb-4 cocktail-name">
        {loading === "fulfilled" ? cocktail.strDrink : "Loading..."}
      </p>
      <div className="w-full flex justify-between px-2 md:px-4">
        <div className="flex flex-col gap-1 md:gap-2">
          <p className="text-app-cadet font-app-text text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px]">
            <span className="font-bold">Type:</span>{" "}
            {loading === "fulfilled" ? cocktail.strAlcoholic : ""}
          </p>
          <p className="text-app-cadet font-app-text text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px]">
            <span className="font-bold">Glass:</span>{" "}
            {loading === "fulfilled" ? cocktail.strGlass : ""}
          </p>
        </div>
        <div className="flex flex-col gap-1 md:gap-2">
          {ingredientsList.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <p
                onClick={() => onIngredientClick(item)}
                className="text-app-cadet font-app-text text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px] cursor-pointer hover:text-app-flame ingredient-name"
              >
                <span className="font-bold">{item.measure}</span> {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutCocktail;
