import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomDrink } from "../../app/features/randomSlice";
import { Title } from "../../components";
import CocktailQuote from "../../components/home/CocktailQuote";

const Home = () => {
  const dispatch = useDispatch();
  const randomCocktail = useSelector((state) => state.random.cocktail);
  const loading = useSelector((state) => state.random.loading);

  useEffect(() => {
    dispatch(fetchRandomDrink());
  }, [dispatch]);

  return (
    <div>
      <Title title="Welcome to BarMix" />
      {loading === "fulfilled" && randomCocktail ? (
        <div className="w-full flex flex-col justify-center items-center px-4 md:px-6 lg:px-20 my-6 md:my-8 lg:my-12">
          <h2 className="text-app-cadet font-app-heading text-[20px] md:text-[24px] lg:text-[28px] text-center">
            {randomCocktail.strDrink}
          </h2>
        </div>
      ) : (
        <p className="text-center">Loading random cocktail...</p>
      )}
      <CocktailQuote />
    </div>
  );
};

export default Home;
