import React from "react";
import { Title } from "../components";
import { Cocktails, Home, Popular, Stats } from "../containers";
import AnimateRoute from "../containers/layout/AnimateRoute";
import { useTitle } from "../hooks/useTitle";
import CategorySelection from "../components/CategorySelection"; // ✅ Only added import

const HomePage = () => {
  useTitle("Cocktails");

  return (
    <AnimateRoute>
      <Home />

      {/* ✅ Keep your original title exactly */}
      <Title title="	“Smart Mixing. Custom Strength. Pure Enjoyment. Cheers!”" />

      {/* ✅ Just insert Category Selection here */}
      <CategorySelection />

      {/* ✅ Everything below remains untouched */}
      <Stats />
      <Title title="Most popular cocktails" />
      <Popular />
      <Title title="Browse Cocktails By Name" />
      <Cocktails />
    </AnimateRoute>
  );
};

export default HomePage;
