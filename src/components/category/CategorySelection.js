// src/components/category/CategorySelection.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchByIngredient } from "../../app/features/fetchByIngredientSlice";
import { topLevelCategories, subCategories } from "../../app/utils/data";

const CategorySelection = () => {
  const dispatch = useDispatch();
  const [selectedTopCategory, setSelectedTopCategory] = useState("Spirits");

  const handleTopCategoryClick = (category) => {
    setSelectedTopCategory(category);
  };

  const handleSubCategoryClick = (subCategory) => {
    if (selectedTopCategory === "Spirits") {
      dispatch(fetchByIngredient(subCategory));
    }
    // Add logic for Mood, Strength, Occasion if needed
  };

  return (
    <div className="flex flex-col gap-4">
      {/* First Row: Top-Level Categories */}
      <div className="flex justify-center gap-3 md:gap-5 lg:gap-6 flex-wrap">
        {topLevelCategories.map((category, index) => (
          <div
            key={index}
            className={`rounded-md px-4 py-2 drop-shadow-lg cursor-pointer group hover:scale-105 basic-transition ${
              selectedTopCategory === category ? "bg-app-flame text-white" : "bg-white text-app-cadet"
            }`}
            onClick={() => handleTopCategoryClick(category)}
          >
            <p className="text-sm md:text-base lg:text-lg font-app-text">
              {category}
            </p>
          </div>
        ))}
      </div>

      {/* Second Row: Dynamic Sub-Categories */}
      <div className="flex justify-center gap-3 md:gap-5 lg:gap-6 flex-wrap">
        {subCategories[selectedTopCategory]?.map((subCategory, index) => (
          <div
            key={index}
            className="rounded-md px-4 py-2 drop-shadow-lg cursor-pointer group hover:scale-105 basic-transition bg-white text-app-cadet"
            onClick={() => handleSubCategoryClick(subCategory)}
          >
            <p className="text-sm md:text-base lg:text-lg font-app-text">
              {subCategory}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
