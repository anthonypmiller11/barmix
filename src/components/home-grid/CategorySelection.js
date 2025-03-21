// src/components/category/CategorySelector.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CocktailCard from "../cocktail/CocktailCard";
import { cocktailsGridAnimation } from "../../app/utils/animationsHelper";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = {
  Spirit: ["Vodka", "Tequila", "Whiskey", "Gin", "Rum", "Champagne", "Brandy"],
  Strengths: ["Popular", "Light", "Medium", "Strong", "Nonalcoholic", "Trendy", "Exotic"],
  Flavor: ["Sweet", "Sour", "Bitter", "Fruity", "Spicy", "Smoky", "Creamy"],
  Style: ["Classic", "Tropical", "Sparkling", "Creamy", "Frozen", "Longdrink", "Martini"],
  Mood: ["Relaxed", "Upbeat", "Romantic", "Festive", "Cozy", "Adventurous"],
  Occasion: ["Party", "Dinner", "Beach", "Casual", "Date Night", "Brunch"]
};

const CategorySelector = () => {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  const { cocktails, loading } = useSelector((state) => state.cocktail);

  const filteredCocktails = selectedSub
    ? cocktails.filter((c) =>
        c.tags?.toLowerCase().includes(selectedSub.toLowerCase())
      )
    : [];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top row buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {Object.keys(CATEGORIES).map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 text-sm md:text-base rounded-full border transition duration-200 ${
              selectedTop === cat ? "bg-app-flame text-white" : "border-app-cadet text-app-cadet hover:bg-app-cadet hover:text-white"
            }`}
            onClick={() => {
              setSelectedTop(cat);
              setSelectedSub(null);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Second row buttons (subcategory) */}
      {selectedTop && (
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {CATEGORIES[selectedTop].map((sub) => (
            <button
              key={sub}
              className={`px-3 py-1 text-sm md:text-base rounded-full border transition duration-200 ${
                selectedSub === sub ? "bg-app-olivine text-white" : "border-app-cadet text-app-cadet hover:bg-app-cadet hover:text-white"
              }`}
              onClick={() => setSelectedSub(sub)}
            >
              {sub}
            </button>
          ))}
        </motion.div>
      )}

      {/* Grid of cocktails filtered by tag */}
      <div className="w-full px-6 mt-8">
        <AnimatePresence>
          {selectedSub && (
            <motion.div
              layoutId="filteredCocktailGrid"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredCocktails.map((cocktail, index) => (
                <motion.div
                  key={cocktail.id + index}
                  variants={cocktailsGridAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                >
                  <CocktailCard cocktail={cocktail} loading={loading} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategorySelector;
