// src/containers/home/ImageRotation.js
import React from "react";
import imageSet from "../../assets/data/imageSet"; // Corrected path to match src/assets/data/imageSet.js

const ImageRotation = () => {
  return (
    <div className="grid grid-cols-3 gap-4 px-[5vw] md:px-[6vw] lg:px-[7vw] my-8">
      {/* Left Column */}
      <div className="flex flex-col gap-4">
        {imageSet.left.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Left ${index + 1}`}
            className="rounded-lg shadow object-cover w-full h-auto"
          />
        ))}
      </div>
      {/* Center Column */}
      <div>
        {imageSet.center.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Center ${index + 1}`}
            className="rounded-lg shadow object-cover w-full h-auto"
          />
        ))}
      </div>
      {/* Right Column */}
      <div className="flex flex-col gap-4">
        {imageSet.right.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Right ${index + 1}`}
            className="rounded-lg shadow object-cover w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageRotation;
