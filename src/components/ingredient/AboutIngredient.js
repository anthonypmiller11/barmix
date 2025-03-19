import React from "react";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AboutIngredient = () => {
  const currentIngredient = useSelector((state) => state.aboutIngredient.ingredient);
  return (
    <div>
      <p>{currentIngredient?.strIngredient1 || "Loading..."}</p>
      {currentIngredient && (
        <LazyLoadImage
          src={currentIngredient.imageMedium}
          alt={currentIngredient.strIngredient1}
          className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full mb-4"
        />
      )}
    </div>
  );
};

export default AboutIngredient;
