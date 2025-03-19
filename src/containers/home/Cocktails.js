import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../app/features/cocktailsSlice";

const Cocktails = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.cocktails);
  const loading = useSelector((state) => state.cocktails.loading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <div>
      {loading === "idle" || loading === "pending" ? (
        <p>Loading...</p>
      ) : (
        cocktails.map((cocktail) => (
          <div key={cocktail.idDrink}>{cocktail.strDrink}</div>
        ))
      )}
    </div>
  );
};

export default Cocktails;
