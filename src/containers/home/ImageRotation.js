import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import imageSet from "../../assets/imageSet"; // Import your images array

const ImageRotation = () => {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % imageSet.left.length);
      setRightIndex((prev) => (prev + 1) % imageSet.right.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 my-12 px-[5vw] md:px-[6vw] lg:px-[7vw]">
      {/* Left Column Animation */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <motion.div
          key={leftIndex + "-top"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <LazyLoadImage
            src={imageSet.left[leftIndex % imageSet.left.length]}
            className="w-full rounded-lg shadow-md"
            alt="Left top"
          />
        </motion.div>
        <motion.div
          key={leftIndex + "-bottom"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <LazyLoadImage
            src={imageSet.left[(leftIndex + 1) % imageSet.left.length]}
            className="w-full rounded-lg shadow-md"
            alt="Left bottom"
          />
        </motion.div>
      </div>

      {/* Center Larger Image */}
      <div className="flex items-center justify-center">
        <LazyLoadImage
          src={imageSet.center}
          className="rounded-2xl shadow-lg w-[80%]"
          alt="Center Image"
        />
      </div>

      {/* Right Column Animation */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <motion.div
          key={rightIndex + "-top"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <LazyLoadImage
            src={imageSet.right[rightIndex % imageSet.right.length]}
            className="w-full rounded-lg shadow-md"
            alt="Right top"
          />
        </motion.div>
        <motion.div
          key={rightIndex + "-bottom"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <LazyLoadImage
            src={imageSet.right[(rightIndex + 1) % imageSet.right.length]}
            className="w-full rounded-lg shadow-md"
            alt="Right bottom"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageRotation;
