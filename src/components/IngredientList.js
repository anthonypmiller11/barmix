// src/components/ingredient/IngredientList.js
import React from "react";
import { HTTP_STATUS } from "../../app/utils/constants";
import ingredientsData from "../../data/ingredients.json"; // Import the ingredients JSON file

const IngredientList = ({ items, loadState, oops, limit }) => {
  if (loadState === HTTP_STATUS.PENDING) {
    return <h3 className="text-app-cadet">Waiting on this...</h3>;
  }
  if (oops) {
    return <h3 className="text-app-flame">Error: {oops}</h3>;
  }
  if (!items || items.length === 0) {
    return <h3 className="text-app-cadet">No items here</h3>;
  }

  return (
    <ul className="list-disc pl-6 text-app-cadet">
      {items.slice(0, limit).map((thing, i) => (
        <li key={i} className="py-2 hover:text-app-flame cursor-pointer">
          {thing.strIngredient1 || "Unnamed item"} - Click for details
        </li>
      ))}
    </ul>
  );
};

export default IngredientList;
