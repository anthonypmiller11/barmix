import React from "react";
import { useDispatch } from "react-redux";
import { setIngredient } from "../../app/features/aboutIngredientSlice";

const IngredientWithMeasure = ({ ingredient, measure }) => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(setIngredient({ strIngredient1: ingredient }));
  return (
    <div onClick={onClick}>
      <p>{measure} {ingredient}</p>
    </div>
  );
};

export default IngredientWithMeasure;
