// CategorySelection.js
import React, { useState } from "react";
import SubcategoryButtons from "./SubcategoryButtons";
import FilteredCocktailGrid from "./FilteredCocktailGrid";

const categories = {
  Spirit: ["Vodka", "Tequila", "Whiskey", "Gin", "Rum", "Champagne", "Brandy"],
  Strengths: ["Popular", "Light", "Medium", "Strong", "Nonalcoholic", "Trendy", "Exotic"],
  Flavor: ["Sweet", "Sour", "Bitter", "Fruity", "Spicy", "Smoky", "Creamy"],
  Style: ["Classic", "Tropical", "Sparkling", "Creamy", "Frozen", "Longdrink", "Martini"],
  Mood: ["Relaxed", "Upbeat", "Romantic", "Festive", "Cozy", "Adventurous"],
  Occasion: ["Party", "Dinner", "Beach", "Casual", "Date Night", "Brunch"],
};

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <div className="w-full px-4 py-4 md:py-6 lg:py-8">
      {/* Top Row Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedTag(null); // reset grid
            }}
            className={`px-4 py-2 rounded-full font-semibold text-sm md:text-base shadow-md hover:scale-105 transition-transform duration-200 
              ${selectedCategory === category ? "bg-app-flame text-white" : "bg-white text-app-flame border border-app-flame"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Second Row Subcategories */}
      {selectedCategory && (
        <SubcategoryButtons
          options={categories[selectedCategory]}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
      )}

      {/* Filtered Cocktail Grid */}
      {selectedTag && (
        <div className="mt-6">
          <FilteredCocktailGrid filterTag={selectedTag} />
        </div>
      )}
    </div>
  );
};

export default CategorySelection;
