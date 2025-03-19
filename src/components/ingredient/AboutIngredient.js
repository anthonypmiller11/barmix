import React from "react";
import { useSelector } from "react-redux";
import { HTTP_STATUS } from "../app/utils/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AboutIngredient = () => {
  const loading = useSelector((state) => state.ingredient.loading);
  const ingredient = useSelector((state) => state.ingredient.currentIngredient);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 p-4 md:p-6">
      <p className="text-app-cadet font-app-quote text-[18px] md:text-[20px] lg:text-[24px] text-center">
        {loading === HTTP_STATUS.FULFILLED ? ingredient.strIngredient1 : "Loading..."}
      </p>
      {loading === HTTP_STATUS.FULFILLED && (
        <LazyLoadImage
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover drop-shadow-md"
          src={ingredient.image}
          alt={ingredient.strIngredient1}
          placeholder={<div className="loading animate-loading w-32 h-32 md:w-40 md:h-40 rounded-full"></div>}
        />
      )}
    </div>
  );
};

export default AboutIngredient;
