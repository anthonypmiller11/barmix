import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchByCategory } from "../app/features/categorySlice";
import { calcOtherCocktailGrid } from "../app/utils/helpers";
import { CocktailsGrid, Title } from "../components";
import AnimateRoute from "../containers/layout/AnimateRoute";
import { useTitle } from "../hooks/useTitle";
import useWindowSize from "../hooks/useWindowSize";
import { categoryTypes } from "../app/utils/data";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("id") ?? "0";

  const cocktails = useSelector((state) => state.category.cocktails);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);

  const [selectedType, setSelectedType] = useState(type);

  useTitle(`${categoryTypes?.[selectedType] ?? "Error"} | Cocktails`);
  const size = useWindowSize();

  const onChangeType = (index) => {
    setSelectedType(index);
    searchParams.set("id", index);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setSelectedType(type);
  }, [type]);

  useEffect(() => {
    const promise = dispatch(fetchByCategory(selectedType));
    return () => promise.abort();
  }, [dispatch, selectedType]);

  return (
    <AnimateRoute>
      <Title title="Select From Your Favorite Category" />
      <div className="bg-image flex justify-center gap-3 md:gap-5 lg:gap-6 flex-wrap mt-7 mb-8 md:mt-10 md:mb-12 py-6 md:py-8 lg:py-10 px-2 md:px-20 lg:px-28">
        {categoryTypes.map((category, index) => (
          <div
            key={index}
            className={`rounded-md px-[12px] md:px-4 lg:px-6 py-[14px] md:py-[16px] lg:py-2 drop-shadow-lg cursor-pointer group md:hover:scale-110 basic-transition ${
              index === Number(selectedType) ? "bg-app-flame" : "bg-white"
            }`}
            onClick={() => onChangeType(index)}
          >
            <p
              className={`text-sm md:text-base lg:text-lg font-app-text ${
                index === Number(selectedType) ? "text-white" : "text-app-cadet"
              }`}
            >
              {category}
            </p>
          </div>
        ))}
      </div>
      <div className="px-[12vw] md:px-[13vw] lg:px-[14vw] overflow-hidden">
        {error && (
          <div className="text-app-flame text-center text-lg mb-4">
            Failed to load cocktails: {error}
          </div>
        )}
        <CocktailsGrid
          list={cocktails}
          loading={loading}
          error={error}
          perPage={calcOtherCocktailGrid(size.width)}
        />
      </div>
    </AnimateRoute>
  );
};

export default CategoriesPage;
