import React from "react";
import IngredientsGrid from "../ingredient/IngredientsGrid";
import { useSelector } from "react-redux";
import { HTTP_STATUS } from "../../app/utils/constants";

const FilteredCocktailGrid = ({ filteredList }) => {
  const loading = useSelector((state) => state.ingredient.loading);
  const error = useSelector((state) => state.ingredient.error);

  return (
    <div className="mt-8">
      <IngredientsGrid
        list={filteredList}
        loading={loading || HTTP_STATUS.FULFILLED}
        error={error}
        perPage={20} // Or whatever your default is
      />
    </div>
  );
};

export default FilteredCocktailGrid;
