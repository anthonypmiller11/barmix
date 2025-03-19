import React from "react";
import { motion } from "framer-motion";
import { fromBelow } from "../../app/utils/animationsHelper";

const InfoCard = ({ title, info, loading }) => {
  return (
    <motion.div
      variants={fromBelow}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
        delay: 0.2,
      }}
      className="w-full flex flex-col justify-start items-center"
    >
      {loading ? (
        <div className="loading animate-loading rounded-xl w-1/2 h-5 md:h-6 mb-2"></div>
      ) : (
        <p className="text-app-cadet font-app-heading text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px] font-bold">
          {title}
        </p>
      )}
      {loading ? (
        <div className="loading animate-loading rounded-xl w-3/4 h-4 md:h-5"></div>
      ) : (
        <p className="text-app-cadet font-app-main text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px] tracking-wider">
          {info}
        </p>
      )}
    </motion.div>
  );
};

export default InfoCard;
