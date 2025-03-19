import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomCocktail } from "../../app/features/randomSlice";
import { fetchCocktails } from "../../app/features/cocktailsSlice";
import { Title } from "../../components";
import Cocktails from "./Cocktails";
import Popular from "./Popular";

const Home = () => {
  const dispatch = useDispatch();
  const randomCocktail = useSelector((state) => state.random.cocktail);
  const loading = useSelector((state) => state.random.loading);

  useEffect(() => {
    dispatch(fetchRandomCocktail());
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <div>
      <Title title="Welcome to BarMix" />
      {loading === "fulfilled" && randomCocktail ? (
        <div>
          <h2>{randomCocktail.strDrink}</h2>
          <p>
            There are two kinds of people I don’t trust: people who don’t drink and people who collect stickers. — Chelsea Handler
          </p>
          <div>
            <p>Total Drinks</p>
            <p>Non Alcoholic</p>
            <p>Categories</p>
            <p>Ingredients</p>
          </div>
        </div>
      ) : (
        <p>Loading random cocktail...</p>
      )}
      <Title title="Cocktails from around the world" />
      <Title title="Most popular cocktails" />
      <Popular />
      <Title title="Browse Cocktails by Name" />
      <Cocktails />
    </div>
  );
};

export default Home;
