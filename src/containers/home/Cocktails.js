import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails, fetchByFirstLetter, onLetterClick } from "../../app/features/cocktailsSlice";
import SelectLetter from "../../components/home/SelectLetter";
import { Link } from "react-router-dom";

const Cocktails = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.cocktails);
  const loading = useSelector((state) => state.cocktails.loading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  const handleLetterFilter = (letter) => {
    dispatch(fetchByFirstLetter(letter));
    dispatch(onLetterClick(cocktails.filter(cocktail => 
      cocktail.strDrink.toUpperCase().startsWith(letter)
    )));
  };

  return (
    <div className="w-full flex flex-col justify-start items-center px-4 md:px-6 lg:px-20 my-6 md:my-8 lg:my-12">
      <SelectLetter onLetterFilter={handleLetterFilter} />
      {loading === HTTP_STATUS.FULFILLED ? (
        <div className="w-full flex flex-col gap-2">
          {cocktails.map((cocktail) => (
            <Link key={cocktail.idDrink} to={`/cocktail/${cocktail.idDrink}`}>
              <div className="text-app-cadet font-app-text text-[14px] md:text-[16px] lg:text-[18px] hover:text-app-flame">
                {cocktail.strDrink}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cocktails;
