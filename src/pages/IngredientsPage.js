// src/pages/IngredientsPage.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../app/features/ingredientSlice";
import { hideIngredientModal } from "../app/features/modalSlice";
import { calcIngredientsGrid } from "../app/utils/helpers";
import { AboutIngredient, IngredientList, Title, Modal } from "../components";
import AnimateRoute from "../containers/layout/AnimateRoute";
import { useTitle } from "../hooks/useTitle";
import useWindowSize from "../hooks/useWindowSize";

const IngredientsPage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const loadState = useSelector((state) => state.ingredient.loading);
  const oops = useSelector((state) => state.ingredient.error);
  const showModal = useSelector((state) => state.modal.showIngredientModal);

  useTitle("Ingredients | Cocktails");
  const size = useWindowSize();

  const onCloseModal = () => {
    dispatch(hideIngredientModal());
  };

  useEffect(() => {
    const promise = dispatch(fetchIngredients());
    return () => promise.abort();
  }, [dispatch]);

  return (
    <AnimateRoute>
      <Title className="mt-7 mb-8 md:mt-10 md:mb-12 lg:mt-12 lg:mb-16" title="Pick Your Poison" />
      <div className="px-[5vw] md:px-[6vw] lg:px-[7vw]">
        <IngredientList items={ingredients} loadState={loadState} oops={oops} limit={calcIngredientsGrid(size.width)} />
      </div>
      <Modal onCloseModal={onCloseModal} show={showModal}>
        <AboutIngredient />
      </Modal>
    </AnimateRoute>
  );
};

export default IngredientsPage;
