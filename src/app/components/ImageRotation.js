import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchByCategory } from "../../app/features/categorySlice";
import { fetchByAlcoholic } from "../../app/features/alcoholicSlice"; // Import fetchByAlcoholic
import { HTTP_STATUS } from "../../app/utils/constants";
import CocktailsGrid from "../../components/CocktailsGrid";
import "../../assets/imageset"; // Fixed import path

const categories = ["Spirit", "Strengths", "Flavor", "Style", "Mood", "Occasion", "Non-Alcoholic"]; // Added "Non-Alcoholic"

const ImageRotation = () => {
  const dispatch = useDispatch();
  const { cocktails: categoryCocktails = [], loading: categoryLoading = HTTP_STATUS.IDLE, error: categoryError = null } = useSelector((state) => state.category || {});
  const { cocktails: alcoholicCocktails = [], loading: alcoholicLoading = HTTP_STATUS.IDLE, error: alcoholicError = null } = useSelector((state) => state.alcoholic || {});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategoryClick = (categoryIndex) => {
    if (categories[categoryIndex] === "Non-Alcoholic") {
      setSelectedCategory("Non-Alcoholic");
      setSelectedSubCategory(null); // Reset subcategory
      dispatch(fetchByAlcoholic("Non alcoholic")); // Fetch non-alcoholic drinks
    } else {
      setSelectedCategory(categoryIndex);
      setSelectedSubCategory(null); // Reset subcategory when a new category is selected
      dispatch(fetchByCategory(categoryIndex));
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const renderSubCategories = () => {
    if (selectedCategory === "Non-Alcoholic") return null; // No subcategories for Non-Alcoholic

    if (!selectedCategory || !categoryCocktails[selectedCategory]) return null;

    const subCategories = Object.keys(categoryCocktails[selectedCategory]);
    if (subCategories.length === 0) {
      return <p>No subcategories available.</p>; // Fallback for empty subcategories
    }

    return (
      <div className="flex justify-center items-center gap-4 mt-4">
        {subCategories.map((subCategory) => (
          <button
            key={subCategory}
            className={`px-4 py-2 rounded ${
              selectedSubCategory === subCategory ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleSubCategoryClick(subCategory)}
          >
            {subCategory}
          </button>
        ))}
      </div>
    );
  };

  const renderCocktailGrid = () => {
    if (selectedCategory === "Non-Alcoholic") {
      if (alcoholicLoading === HTTP_STATUS.PENDING) {
        return <p>Loading non-alcoholic cocktails...</p>;
      }

      if (alcoholicLoading === HTTP_STATUS.REJECTED) {
        return <p>Error: {alcoholicError || "Failed to load non-alcoholic cocktails."}</p>;
      }

      if (alcoholicCocktails.length > 0) {
        return <CocktailsGrid list={alcoholicCocktails} loading={alcoholicLoading} />;
      }

      return <p>No non-alcoholic cocktails found.</p>;
    }

    if (categoryLoading === HTTP_STATUS.PENDING) {
      return <p>Loading cocktails...</p>;
    }

    if (categoryLoading === HTTP_STATUS.REJECTED) {
      return <p>Error: {categoryError || "Failed to load cocktails."}</p>;
    }

    if (selectedSubCategory && categoryCocktails[selectedCategory]?.[selectedSubCategory]) {
      return (
        <CocktailsGrid
          list={categoryCocktails[selectedCategory][selectedSubCategory]}
          loading={categoryLoading}
        />
      );
    }

    return <p>Select a subcategory to view cocktails.</p>;
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${
              selectedCategory === index || selectedCategory === "Non-Alcoholic" && category === "Non-Alcoholic"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </button>
        ))}
      </div>

      {renderSubCategories()}

      <div className="mt-8">{renderCocktailGrid()}</div>
    </div>
  );
};

export default ImageRotation;
