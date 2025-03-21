import React from "react";

const SubcategoryButtons = ({ selectedCategory, subcategories, onSubcategoryClick }) => {
  if (!selectedCategory) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {subcategories[selectedCategory]?.map((sub) => (
        <button
          key={sub}
          onClick={() => onSubcategoryClick(sub)}
          className="px-4 py-2 rounded-xl text-sm md:text-base font-medium text-white bg-app-flame hover:bg-app-rose focus:outline-none focus:ring-2 focus:ring-app-rose transition-all"
        >
          {sub}
        </button>
      ))}
    </div>
  );
};

export default SubcategoryButtons;
