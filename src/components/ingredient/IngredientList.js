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
    <ul>
      {ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
  );
};

export { IngredientList }; // Change to named export
