import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchByFirstLetter, onLetterClick } from "../../app/features/cocktailsSlice";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Hardcoded alphabet array

const SelectLetter = () => {
  const dispatch = useDispatch();
  const selectedLetter = useSelector((state) => state.cocktails.selectedLetter);

  const onClick = (letter) => {
    dispatch(onLetterClick(letter));
    const promise = dispatch(fetchByFirstLetter(letter));
    return () => {
      promise.abort();
    };
  };

  if (!onClick || typeof onClick !== "function") {
    console.error("Error: onClick is not a valid function."); // Handle missing or invalid callback
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-[3px] flex-wrap">
      {alphabet.map((letter, i) => (
        <div key={i} onClick={() => onClick(letter)} className="flex justify-center items-center gap-[3px]">
          <p className={`text-2xl font-app-main font-bold cursor-pointer basic-transition hover:text-[28px] hover:text-app-flame ${selectedLetter === letter ? "text-app-flame" : "text-app-cadet"}`}>
            {letter}
          </p>
          <p className="text-2xl font-app-main font-bold text-app-cadet/50">
            {i < 25 && " /"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SelectLetter;
