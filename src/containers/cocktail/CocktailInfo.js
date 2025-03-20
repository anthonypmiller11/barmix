import React, { useEffect, useState } from "react";
import { HTTP_STATUS } from "../../app/utils/constants";
import { ImagePlaceHolder } from "../../assets";
import { Favorite, IngredientsList } from "../../components";
import { motion } from "framer-motion";
import { fromRight, fromTop } from "../../app/utils/animationsHelper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CocktailInfo = ({ cocktail, loading }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (loading === HTTP_STATUS.FULFILLED) {
      setTags([]);
      cocktail.tags !== null && setTags(cocktail.tags.split(","));
    }
  }, [loading, cocktail.tags]);

  return (
    <section className="px-6 md:px-12 lg:px-20 w-full mt-6 md:mt-8 lg:mt-12 mb-8 overflow-hidden">
      <motion.div
        layoutId="cocktails-details"
        className="flex flex-col-reverse md:flex-row w-full gap-6 md:gap-10 items-center md:items-start"
      >
        <div className="flex flex-col items-center md:items-start w-full md:w-2/3">
          {/* Cocktail Name - Adjusted Font & Flame Color */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-app-red-orange mb-2 text-center md:text-left">
            {cocktail.drink}
          </h1>
          <p className="text-lg md:text-xl text-app-cadet font-semibold mb-4">
            {cocktail.alcoholic}
          </p>

          {/* Updated Category & Glass Info with Mobile Fixes */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 text-sm md:text-lg font-medium text-app-dark mb-6">
            <div className="border-2 border-app-cadet px-3 py-1 md:px-4 md:py-2 rounded-lg w-[100px] text-center">
              {cocktail.ingredients?.length} Ingredients
            </div>
            <div className="border-2 border-app-cadet px-3 py-1 md:px-4 md:py-2 rounded-lg w-[100px] text-center">
              {cocktail.category}
            </div>
            <div className="border-2 border-app-cadet px-3 py-1 md:px-4 md:py-2 rounded-lg w-[100px] text-center">
              {cocktail.glass}
            </div>
          </div>

          {/* Ingredients List - Unchanged */}
          <IngredientsList cocktail={cocktail} loading={loading} />
        </div>

        {/* Cocktail Image Section - Ensures Alignment */}
        <div className="w-full md:w-1/3 flex justify-center">
          <motion.div
            variants={fromTop}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.3, delay: 0.1 }}
            className="rounded-lg drop-shadow-xl h-max group ring-1 ring-white"
          >
            {loading !== HTTP_STATUS.FULFILLED && (
              <div className="loading animate-loading rounded-xl w-full aspect-[4/3] md:aspect-square"></div>
            )}
            {loading === HTTP_STATUS.FULFILLED && (
              <LazyLoadImage
                className="w-full h-auto rounded-xl object-cover drop-shadow-md md:drop-shadow-lg aspect-[4/3] md:aspect-square"
                src={cocktail.image ?? ImagePlaceHolder}
                alt={cocktail.drink}
                placeholder={<div className="loading animate-loading rounded-xl w-full aspect-[4/3] md:aspect-square"></div>}
              />
            )}
            <Favorite cocktail={cocktail} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CocktailInfo;
