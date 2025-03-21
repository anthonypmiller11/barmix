// src/components/IngredientsGrid.js
import React from "react";
import { HTTP_STATUS } from "../app/utils/constants";
import { Link } from "react-router-dom";

const IngredientsGrid = ({ list, loading, error, perPage }) => {
  if (loading === HTTP_STATUS.PENDING) return <div>Loading ingredients...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!list || list.length === 0) return <div>No ingredients found.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {list.slice(0, perPage).map((ingredient, index) => (
        <Link
          key={index}
          to={`/cocktails-by-ingredient/${ingredient.strIngredient1}`}
          className="p-4 bg-white rounded-lg shadow text-app-cadet hover:bg-app-flame hover:text-white basic-transition"
        >
          {ingredient.strIngredient1}
        </Link>
      ))}
    </div>
  );
};

export default IngredientsGrid;
