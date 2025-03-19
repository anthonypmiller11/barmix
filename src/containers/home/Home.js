import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRandomCocktail } from "../../app/features/randomSlice";
import { Title } from "../../components";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRandomCocktail());
  }, [dispatch]);

  return (
    <div>
      <Title title="Welcome to BarMix" />
      {/* Add more content as needed */}
    </div>
  );
};

export default Home;
