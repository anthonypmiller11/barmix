import React from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { fromBelow } from "../../app/utils/animationsHelper";
import { Favorite } from "..";

const CocktailCard = ({ cocktail, loading }) => {
  return (
    <motion.div
      variants={fromBelow}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.1,
      }}
      className="relative rounded-xl drop-shadow-xl h-max group ring-1 ring-white"
    >
      <div className="relative">
        {loading ? (
          <div className="loading animate-loading rounded-xl w-full aspect-[4/3]"></div>
        ) : (
          <LazyLoadImage
            className="w-full h-auto rounded-xl object-cover drop-shadow-md md:drop-shadow-lg aspect-[4/3]"
            src={cocktail.image}
            alt={cocktail.drink}
            placeholder={
              <div className="loading animate-loading rounded-xl w-full aspect-[4/3]"></div>
            }
          />
        )}
        <Favorite cocktail={cocktail} />
      </div>
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-app-cadet/80 to-transparent rounded-b-xl"></div>
      <div className="absolute bottom-0 w-full flex flex-col justify-end items-center px-2 py-2">
        {loading ? (
          <div className="loading animate-loading rounded-xl w-3/4 h-5 md:h-6 mb-2"></div>
        ) : (
          <p className="text-white font-app-heading text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px] text-center mb-2">
            {cocktail.drink}
          </p>
        )}
        {loading ? (
          <div className="loading animate-loading rounded-xl w-1/2 h-4 md:h-5"></div>
        ) : (
          <p className="text-white font-app-main text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] text-center">
            {cocktail.alcoholic}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default CocktailCard;
