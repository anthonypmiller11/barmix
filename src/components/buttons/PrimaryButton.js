import React from "react";
import { motion } from "framer-motion";
import { fromBelow } from "../../app/utils/animationsHelper";

const PrimaryButton = ({ onClick, text }) => {
  return (
    <motion.div
      onClick={onClick}
      variants={fromBelow}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        delay: 0.5,
      }}
      className="active:scale-95 rounded-md bg-white px-4 md:px-6 py-2 md:py-3 drop-shadow-lg group hover:cursor-pointer basic-transition"
    >
      <p className="text-app-cadet font-app-heading text-[12px] md:text-[13px] lg:text-[15px] xl:text-[16px] tracking-wider group-hover:animate-expand">
        {text}
      </p>
    </motion.div>
  );
};

export default PrimaryButton;
