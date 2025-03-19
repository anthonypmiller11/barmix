import React from "react";
import { useDispatch } from "react-redux";
import { HTTP_STATUS } from "../../app/utils/constants";
import { showIngredientModal } from "../../app/features/modalSlice";
import { setCurrentIngredient } from "../../app/features/ingredientSlice";

const AboutCocktail = ({ cocktail, loading }) => {
  const dispatch = useDispatch();

  const ingredientsList = [];
  for (let i = 1; i <= 8; i++) {
    if (cocktail[`strIngredient${i}`]) {
      ingredientsList.push({
        name: cocktail[`strIngredient${i}`],
        measure: cocktail[`strMeasure${i}`] || "",
        image: `/images/ingredients/${cocktail[`strIngredient${i}`].replace(/\s+/g, "_")}.png`,
      });
    }
  }

  const onIngredientClick = (ingredient) => {
    dispatch(setCurrentIngredient({ strIngredient1: ingredient.name, image: ingredient.image }));
    dispatch(showIngredientModal());
  };

  return (
    <div className="w-full flex flex-col justify-start mb-8">
      <p className="font-app-quote text-app-cadet text-[22px] md:text-[24px] lg:text-[28px] xl:text-[32px] text-center mb-2 md:mb-4 cocktail-name">
        {loading === HTTP_STATUS.FULFILLED ? cocktail.drink : "Loading..."}
      </p>
      <div className="w-full flex justify-between px-2 md:px-4">
        <div className="flex flex-col gap-1 md:gap-2">
          <p className="text-app-cadet font-app-text text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px]">
            <span className="font-bold">Type:</span>{" "}
            {loading === HTTP_STATUS.FULFILLED ? cocktail.alcoholic : ""}
          </p>
          <p className="text-app-cadet font-app-text text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px]">
            <span className="font-bold">Category:</span>{" "}
            {loading === HTTP_STATUS.FULFILLED ? cocktail.category : ""}
          </p>
          <p className="text-app-cadet font-app-text text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px]">
            <span className="font-bold">Glass:</span>{" "}
            {loading === HTTP_STATUS.FULFILLED ? cocktail.glass : ""}
          </p>
        </div>
        <div className="flex flex-col gap-1 md:gap-2">
          {ingredientsList.map((item, index) => (
            <p
              key={index}
              onClick={() => onIngredientClick(item)}
              className="text-app-cadet font-app-text text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px] cursor-pointer hover:text-app-flame ingredient-name"
            >
              <span className="font-bold">{item.measure}</span> {item.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutCocktail;
