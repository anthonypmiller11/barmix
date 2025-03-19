import React from "react";
import { useDispatch } from "react-redux";
import { fetchCocktails } from "../../app/features/cocktailsSlice";

const SelectLetter = () => {
  const dispatch = useDispatch();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLetterClick = (letter) => {
    // Since we're using local data, filter locally instead of fetching
    dispatch(fetchCocktails()); // Fetch all, filter in component
  };

  return (
    <div>
      {alphabet.map((letter) => (
        <button key={letter} onClick={() => handleLetterClick(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default SelectLetter;
