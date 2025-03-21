import React from "react";
import { Title } from "../components";
import { Cocktails, Home, Popular, Stats, ImageRotation } from "../containers";
import AnimateRoute from "../containers/layout/AnimateRoute";
import { useTitle } from "../hooks/useTitle";
import CategorySelection from "../components/category/CategorySelection"; // ✅ Only added import

const HomePage = () => {
  useTitle("Cocktails");

  return (
    <AnimateRoute>
      {/* ✅ TOP 20% UI: New category selectors */}
      <div className="pt-4 px-[5vw] md:px-[6vw] lg:px-[7vw]" style={{ height: '20vh', minHeight: '150px' }}>
        <CategorySelection />
      </div>

      {/* ✅ Everything below remains the same */}
      <Home />

      {/* ✅ Rotating quote section */}
      <Title
        title="“Smart Mixing. Custom Strength. Pure Enjoyment. Cheers!”"
      />

      {/* ✅ 3-column animated layout */}
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
