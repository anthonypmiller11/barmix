import React from "react";
import { useDispatch } from "react-redux";
import { setIngredient } from "../../app/features/aboutIngredientSlice";

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(setIngredient(ingredient));
  return (
    <div onClick={onClick}>
      <p>{ingredient.strIngredient1}</p>
    </div>
  );
};

export default IngredientCard;
