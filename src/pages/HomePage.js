import React from "react";
import { Title } from "../components";
import {
  Cocktails,
  Home,
  Popular,
  Stats,
  CocktailInfo,
  VideoTutorial,
} from "../containers";
import AnimateRoute from "../containers/layout/AnimateRoute";
import { useTitle } from "../hooks/useTitle";
import CategorySelection from "../components/category/CategorySelection";
import ImageRotation from "../containers/home/ImageRotation";

const HomePage = () => {
  useTitle("Cocktails");

  return (
    <AnimateRoute>
      {/* ✅ TOP 20%: Two-Row Category Selector */}
      <div className="pt-4 px-[5vw] md:px-[6vw] lg:px-[7vw]" style={{ height: '20vh', minHeight: '150px' }}>
        <CategorySelection />
      </div>

      {/* 🔸 KEEP EXISTING CONTENT */}
      <Home />
      <Title title="“Smart Mixing. Custom Strength. Pure Enjoyment. Cheers!”" />
      <ImageRotation />
      <Stats />
      <Title title="Most popular cocktails" />
      <Popular />
      <Title title="Browse Cocktails By Name" />
      <Cocktails />
    </AnimateRoute>
  );
};

export default HomePage;
