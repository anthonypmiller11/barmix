// src/components/CategorySelection.js
import React from "react";
import { useDispatch } from "react-redux";
import { fetchByCategory } from "../app/features/categorySlice";

const categories = {
  Spirit: ["Vodka", "Tequila", "Whiskey", "Gin", "Rum", "Champagne", "Brandy"],
  Strength: ["Popular", "Light", "Medium", "Strong", "Nonalcoholic", "Trendy", "Exotic"],
  Flavor: ["Sweet", "Sour", "Bitter", "Fruity", "Spicy", "Smoky", "Creamy"],
  Style: ["Classic", "Tropical", "Sparkling", "Creamy", "Frozen", "Longdrink", "Martini"],
  Mood: ["Relaxed", "Upbeat", "Romantic", "Festive", "Cozy", "Adventurous"],
  Occasion: ["Party", "Dinner", "Beach", "Casual", "Date Night", "Brunch"]
};

const CategorySelection = () => {
  const dispatch = useDispatch();

  const handleCategoryClick = (type, value) => {
    dispatch(fetchByCategory({ type, value })); // Triggers filtering
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {Object.entries(categories).map(([type, values]) => (
        <div key={type} className="p-2">
          <h3 className="text-lg font-bold text-center">{type}</h3>
          <div className="flex flex-wrap gap-2">
            {values.map(value => (
              <button
                key={value}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300"
                onClick={() => handleCategoryClick(type, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySelection;
