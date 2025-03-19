import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { showIngredientModal } from "../../app/features/modalSlice";
import { setIngredient } from "../../app/features/aboutIngredientSlice";
import { fromBelow, skeletonGrid } from "../../app/utils/animationsHelper";
import { DummyCocktail } from "../../app/utils/data";
import { LinkButton } from "../buttons";
import IngredientCard from "./IngredientCard";

const IngredientsGrid = ({ list, loading, error, perPage }) => {
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const openIngredient = (ingredient) => {
    dispatch(setIngredient(ingredient));
    dispatch(showIngredientModal());
  };

  useEffect(() => {
    if (list !== null) {
      setIngredients(list);
      setTotalPages(Math.ceil(list.length / perPage));
      setCurrentPage(0);
    }
  }, [list, perPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const currentIngredients = ingredients.slice(startIndex, endIndex);

  return (
    <motion.div
      variants={skeletonGrid}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{
        ease: "easeInOut",
        duration: 0.2,
        delay: 0.1,
      }}
    >
      {loading === "pending" && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
          {[...Array(perPage)].map((_, index) => (
            <IngredientCard
              key={index}
              ingredient={DummyCocktail}
              loading={true}
            />
          ))}
        </div>
      )}
      {loading === "fulfilled" && ingredients.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
          {currentIngredients.map((ingredient, index) => (
            <IngredientCard
              key={index}
              ingredient={ingredient}
              onClick={() => openIngredient(ingredient)}
              loading={false}
            />
          ))}
        </div>
      )}
      {loading === "fulfilled" && ingredients.length === 0 && (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-app-cadet font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
            No Ingredients Found!
          </p>
        </div>
      )}
      {loading === "rejected" && (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-app-flame font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
            {error}
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="w-full flex justify-center mt-8">
          <ReactPaginate
            previousLabel={
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            }
            nextLabel={
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={
              "flex justify-center items-center gap-1 md:gap-2 lg:gap-3"
            }
            pageClassName={
              "rounded-full w
