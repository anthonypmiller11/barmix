import React from "react";
// Removed import for Quotes
// import { Quotes } from "../../app/utils/data";

const CocktailQuote = ({ quote }) => {
  if (!quote || typeof quote !== "string") {
    return <p className="text-center italic">"A cocktail is always a good idea."</p>; // Fallback quote
  }

  return (
    <p className="text-center italic">
      "{quote}"
    </p>
  );
};

export default CocktailQuote;
