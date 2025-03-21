// src/containers/home/ImageRotation.js
import React from "react";
import imageSet from "../../assets/data/imageSet"; // Adjusted path

const ImageRotation = () => {
  return (
    <div className="grid grid-cols-3 gap-4 px-[5vw] md:px-[6vw] lg:px-[7vw] my-8">
      <div className="flex flex-col gap-4">
        {imageSet.left.map((src, index) => (
          <img key={index} src={src} alt={`Left ${index}`} className="rounded-lg shadow" />
        ))}
      </div>
      <div>
        {imageSet.center.map((src, index) => (
          <img key={index} src={src} alt={`Center ${index}`} className="rounded-lg shadow" />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {imageSet.right.map((src, index) => (
          <img key={index} src={src} alt={`Right ${index}`} className="rounded-lg shadow" />
        ))}
      </div>
    </div>
  );
};

export default ImageRotation;
