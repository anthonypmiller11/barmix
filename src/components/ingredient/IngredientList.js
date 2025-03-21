import React from "react";
import { HTTP_STATUS } from "../../app/utils/constants";
import { Link } from "react-router-dom";

const IngredientList = ({ ingredients, loading, error, maxItems }) => {
  if (loading === HTTP_STATUS.PENDING) {
    return <div className="text-app-cadet text-center text-lg">Loading ingredients...</div>;
  }
  if (error) {
    return <div className="text-app-flame text-center text-lg">Error occurred: {error}</div>;
  }
  if (!ingredients || ingredients.length === 0) {
    return <div className="text-app-cadet text-center text-lg">No ingredients available.</div>;
  }

  return (
    <div className="space-y-4">
      {ingredients.slice(0, maxItems).map((ingredient, index) => (
        <Link
          key={index}
          to={`/cocktails-by-ingredient/${ingredient.strIngredient1}`}
          className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <span className="text-app-cadet font-app-text text-base">
            {ingredient.strIngredient1 || "Unknown Ingredient"}
          </span>
          <img
            src={ingredient.image}
            alt={ingredient.strIngredient1}
            className="w-12 h-12 object-cover rounded-md"
          />
        </Link>
      ))}
    </div>
  );
};

export default IngredientList;
