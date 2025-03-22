import React from "react";
import { Title } from "../components";
import { Cocktails, Home, Stats } from "../containers";
import AnimateRoute from "../containers/layout/AnimateRoute";
import { useTitle } from "../hooks/useTitle";
import CategorySelection from "../components/category/CategorySelection";
import ImageRotation from "../containers/home/ImageRotation";

const HomePage = () => {
  useTitle("Cocktails");

  return (
    <AnimateRoute>
      <div className="pt-4 px-[5vw] md:px-[6vw] lg:px-[7vw] mb-8" style={{ minHeight: "150px" }}>
        <CategorySelection />
      </div>
      <Home />
      <Title title="“Smart Mixing. Custom Strength. Pure Enjoyment. Cheers!”" />
      <ImageRotation />
      <Stats />
      <Title title="Browse Cocktails By Name" />
      <Cocktails />
    </AnimateRoute>
  );
};

export default HomePage;
