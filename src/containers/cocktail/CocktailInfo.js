// src/containers/Cocktails.js
import React from "react";
import { FeaturedCocktails } from "./data"; // Importing from src/containers/data.js

// Fucking new component to list cocktails, not that grid bullshit
const Cocktails = () => {
  return (
    <div className="px-[5vw] md:px-[6vw] lg:px-[7vw] my-10">
      <h2 className="text-2xl md:text-3xl text-app-flame font-app-heading mb-6">Featured Fucking Cocktails</h2>
      <div className="flex flex-col gap-8">
        {FeaturedCocktails.map((drink) => (
          <div key={drink.id} className="bg-app-bg p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            <img
              src={drink.image}
              alt={drink.name}
              className="w-full md:w-1/3 h-40 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h3 className="text-xl text-app-cadet font-app-text">{drink.name}</h3>
              <p className="text-app-olivine">{drink.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cocktails;
