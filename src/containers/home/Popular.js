import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../app/features/cocktailsSlice";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Popular = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.cocktails);
  const loading = useSelector((state) => state.cocktails.loading);
  const popularCocktails = cocktails.slice(0, 5); // First 5 as "popular"

  useEffect(() => {
    if (cocktails.length === 0) {
      dispatch(fetchCocktails());
    }
  }, [dispatch, cocktails.length]);

  return (
    <div>
      {loading === "fulfilled" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {popularCocktails.map((cocktail) => (
            <Link key={cocktail.idDrink} to={`/cocktail/${cocktail.idDrink}`}>
              <div className="relative">
                <LazyLoadImage
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="w-full h-auto rounded-xl object-cover"
                  placeholder={<div className="w-full h-48 bg-gray-300 rounded-xl animate-pulse"></div>}
                />
                <p>{cocktail.strDrink}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading popular cocktails...</p>
      )}
    </div>
  );
};

export default Popular;
