import React from "react";
import { motion } from "framer-motion";
import { fromBelow } from "../../app/utils/animationsHelper";
import InfoCard from "./InfoCard";

const AboutCocktail = ({ cocktail, loading }) => {
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
      className="w-full flex flex-col justify-start items-center gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8 lg:mb-10"
    >
      {loading ? (
        <div className="loading animate-loading rounded-xl w-3/4 h-5 md:h-6 mb-2"></div>
      ) : (
        <p className="text-app-cadet font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold">
          {cocktail.drink}
        </p>
      )}
      <div className="w-full flex justify-between items-center gap-2 md:gap-3 lg:gap-4">
        <InfoCard title="Type" info={cocktail.alcoholic} loading={loading} />
        <InfoCard title="Category" info={cocktail.category} loading={loading} />
        <InfoCard title="Glass" info={cocktail.glass} loading={loading} />
      </div>
    </motion.div>
  );
};

export default AboutCocktail;
