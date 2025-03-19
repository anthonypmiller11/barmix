import React from "react";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AboutIngredient = () => {
  const currentIngredient = useSelector((state) => state.aboutIngredient.ingredient);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <p className="font-app-quote text-app-cadet text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] text-center mb-2 md:mb-4">
        {currentIngredient?.strIngredient1 || "Loading..."}
      </p>
      {currentIngredient && (
        <LazyLoadImage
          src={currentIngredient.imageMedium}
          alt={currentIngredient.strIngredient1}
          className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full mb-4"
          placeholder={<div className="w-40 h-40 md:w-48 md:h-48 bg-gray-300 rounded-full animate-pulse"></div>}
          onError={(e) => (e.target.src = "/images/ingredients/default-medium.png")}
        />
      )}
    </div>
  );
};

export default AboutIngredient;
