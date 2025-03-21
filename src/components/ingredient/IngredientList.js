import React from "react";
import { HTTP_STATUS } from "../../app/utils/constants";

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
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <span className="text-app-cadet font-app-text text-base">
            {ingredient.strIngredient1 || "Unknown Ingredient"}
          </span>
          <button className="text-app-flame hover:underline">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
