import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../app/features/ingredientSlice";
import { hideIngredientModal } from "../app/features/modalSlice";
import { calcMaxItems } from "../app/utils/helpers";
import { AboutIngredient, Title, Modal } from "../components";
import { IngredientList } from "../components/ingredient/IngredientList";
import AnimateRoute from "../containers/layout/AnimateRoute";
import { useTitle } from "../hooks/useTitle";
import useWindowSize from "../hooks/useWindowSize";

const IngredientsPage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const loading = useSelector((state) => state.ingredient.loading);
  const error = useSelector((state) => state.ingredient.error);
  const showModal = useSelector((state) => state.modal.showIngredientModal);

  useTitle("Ingredients | Cocktails");
  const size = useWindowSize();

  const onCloseModal = () => {
    dispatch(hideIngredientModal());
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <AnimateRoute>
      <Title className="mt-7 mb-8 md:mt-10 md:mb-12 lg:mt-12 lg:mb-16" title="Explore Ingredients" />
      <div className="px-[5vw] md:px-[6vw] lg:px-[7vw]">
        <IngredientList 
          ingredients={ingredients} 
          loading={loading} 
          error={error} 
          maxItems={calcMaxItems(size.width)} 
        />
      </div>
      <Modal onCloseModal={onCloseModal} show={showModal}>
        <AboutIngredient />
      </Modal>
    </AnimateRoute>
  );
};

export default IngredientsPage;
