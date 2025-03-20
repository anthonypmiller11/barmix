import React, { useEffect, useState } from "react";
import { HTTP_STATUS } from "../../app/utils/constants";
import { ImagePlaceHolder } from "../../assets";
import { Favorite, IngredientsList } from "../../components";
import { motion } from "framer-motion";
import { fromTop, fromRight } from "../../app/utils/animationsHelper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CocktailInfo = ({ cocktail, loading }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (loading === HTTP_STATUS.FULFILLED) {
      setTags(cocktail.tags ? cocktail.tags.split(",") : []);
    }
  }, [loading, cocktail.tags]);

  return (
    <section className="px-12 md:px-13 lg:px-20 w-full mt-6 md:mt-8 lg:mt-12 mb-8 overflow-hidden">
      <motion.div
        layoutId="cocktails-details"
        className="flex w-full md:gap-4 lg:gap-10 flex-col-reverse md:flex-row"
      >
        <div className="flex flex-col justify-start items-center w-full md:w-2/3">
          {/* Cocktail Name */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-app-red mb-2 text-center md:text-left">
            {cocktail.drink}
          </h1>
          <p className="text-lg md:text-xl text-app-cadet font-semibold mb-4">
            {cocktail.alcoholic}
          </p>

          {/* Category & Glass Type */}
          <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 text-md md:text-lg font-medium text-app-dark mb-6">
            <div className="border-2 border-app-cadet px-4 py-2 rounded-lg">
              {cocktail.ingredients?.length} Ingredients
            </div>
            <div className="border-2 border-app-cadet px-4 py-2 rounded-lg">
              {cocktail.category}
            </div>
            <div className="border-2 border-app-cadet px-4 py-2 rounded-lg">
              {cocktail.glass}
            </div>
          </div>

          {/* Ingredients List */}
          <IngredientsList cocktail={cocktail} loading={loading} />
        </div>

        {/* Cocktail Image */}
        <div className="flex flex-col justify-center md:justify-start w-full md:w-1/3 mb-6 md:p-0">
          <motion.div
            variants={fromTop}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              delay: 0.1,
            }}
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

          {/* Tags Section */}
          {loading === HTTP_STATUS.FULFILLED && tags.length > 0 && (
            <motion.div
              variants={fromRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                duration: 0.2,
                delay: 0.3,
              }}
              className="hidden md:flex flex-wrap gap-2 overflow-hidden mt-8 pr-4"
            >
              {tags.map((item, i) => (
                <div
                  key={i}
                  className="rounded-[6px] border border-app-cadet w-max h-min px-[10px] py-[5px] text-[15px] font-semibold text-app-cadet hover:text-white hover:bg-app-cadet cursor-default"
                >
                  {item.trim()}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default CocktailInfo;
