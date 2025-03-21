// src/containers/home/Home.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchRandomDrink, clearRandomDrink } from "../../app/features/randomSlice";
import { HTTP_STATUS } from "../../app/utils/constants";
import { OneByThree } from "../../components";
import { fromBelow } from "../../app/utils/animationsHelper";

const Home = () => {
  const dispatch = useDispatch();
  const randomDrink = useSelector((state) => state.random.cocktail);
  const loading = useSelector((state) => state.random.loading);
  const error = useSelector((state) => state.random.error);

  useEffect(() => {
    dispatch(clearRandomDrink());
    const promise = dispatch(fetchRandomDrink());
    return () => promise.abort();
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(clearRandomDrink());
    dispatch(fetchRandomDrink());
  };

  return (
    <motion.div
      variants={fromBelow}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="px-[5vw] md:px-[6vw] lg:px-[7vw] my-10"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl text-app-flame font-app-heading">
          Featured Cocktail of the Day
        </h2>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-app-flame text-white rounded-md font-app-text text-sm md:text-base hover:bg-app-thin-flame transition-colors"
          disabled={loading === HTTP_STATUS.PENDING}
        >
          {loading === HTTP_STATUS.PENDING ? "Loading..." : "New Cocktail"}
        </button>
      </div>

      {loading === HTTP_STATUS.PENDING && (
        <div className="flex justify-center items-center h-40">
          <p className="text-app-cadet font-app-text text-lg">Loading...</p>
        </div>
      )}

      {loading === HTTP_STATUS.FULFILLED && randomDrink && (
        <motion.div
          key={randomDrink.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <OneByThree cocktail={randomDrink} loading={loading} />
        </motion.div>
      )}

      {loading === HTTP_STATUS.REJECTED && error && (
        <div className="flex justify-center items-center h-40">
          <p className="text-app-flame font-app-text text-lg">
            Error loading cocktail: {error}. Please try again.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
