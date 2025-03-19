import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { showIngredientModal } from "../../app/features/modalSlice";
import { setIngredient } from "../../app/features/aboutIngredientSlice";
import { fromBelow } from "../../app/utils/animationsHelper";
import IngredientWithMeasure from "./IngredientWithMeasure";

const IngredientsList = ({ cocktail, loading }) => {
  const dispatch = useDispatch();

  const ingredientsList = [];
  for (let i = 1; i <= 8; i++) {
    if (cocktail?.[`strIngredient${i}`]) {
      const ingrName = cocktail[`strIngredient${i}`].trim();
      const imageBase = ingrName.replace(/\s+/g, "_");
      ingredientsList.push({
        name: ingrName,
        measure: cocktail[`strMeasure${i}`] || "",
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
    <motion.div
      variants={fromBelow}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.2,
      }}
      className="w-full flex flex-col justify-start items-center"
    >
      {loading ? (
        <div className="w-full flex flex-col gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="loading animate-loading rounded-xl w-full h-5 md:h-6"
            ></div>
          ))}
        </div>
      ) : (
        ingredientsList.map((item, index) => (
          <IngredientWithMeasure
            key={index}
            ingredient={item.name}
            measure={item.measure}
            onClick={() => onIngredientClick(item)}
          />
        ))
      )}
    </motion.div>
  );
};

export default IngredientsList;
