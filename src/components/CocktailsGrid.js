import React, { useEffect, useState } from "react";
// Removed import for DummyCocktail
// import { DummyCocktail } from "../app/utils/data";
import { HTTP_STATUS } from "../app/utils/constants";
import CocktailCard from "./cards/CocktailCard";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import {
  cocktailsGridAnimation,
} from "../app/utils/animationsHelper";

const CocktailsGrid = ({ list, loading, perPage, error, fullData }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = perPage ?? 8;
  const itemsVisited = pageNumber * itemsPerPage;
  const displayItems = Array.isArray(list)
    ? list.slice(itemsVisited, itemsVisited + itemsPerPage)
    : []; // Ensure list is an array
  const pageCount = Array.isArray(list) ? Math.ceil(list.length / itemsPerPage) : 0;

  useEffect(() => {
    setPageNumber(0);
  }, [list]);

  if (!Array.isArray(list)) {
    return <p>Error: Invalid data format for cocktails list.</p>; // Handle invalid list
  }

  if (list.length === 0) {
    return <p>No cocktails available.</p>; // Provide a fallback message
  }

  return (
    <div>
      {loading === HTTP_STATUS.FULFILLED && list.length === 0 && (
        <div className="w-full p-4">
          <p className="text-app-flame font-app-heading text-[24px] md:text-[26px] lg:text-[28px] font-bold text-center">
            {fullData
              ? "No cocktails found in the full dataset."
              : "No cocktails match your search criteria."}
          </p>
        </div>
      )}

      {loading === HTTP_STATUS.REJECTED && error !== "Aborted" && (
        <div className="w-full p-4">
          <p className="text-app-flame font-app-heading text-[24px] md:text-[26px] lg:text-[28px] font-bold text-center">
            {error || "An error occurred while fetching cocktails."}
          </p>
        </div>
      )}

      {(loading === HTTP_STATUS.PENDING ||
        (loading === HTTP_STATUS.REJECTED && error === "Aborted")) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {[...Array(itemsPerPage)].map((_item, index) => {
            return (
              <div key={index}>
                {<CocktailCard cocktail={null} loading={loading} />}
              </div>
            );
          })}
        </div>
      )}

      {loading === HTTP_STATUS.FULFILLED && list.length > 0 && (
        <motion.div
          layoutId="cocktailsGrid"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[12px] md:gap-[20px] lg:gap-8"
        >
          {displayItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                variants={cocktailsGridAnimation}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.2, delay: index * 0.06 }}
              >
                {
                  <CocktailCard
                    cocktail={item}
                    loading={loading}
                    fullData={fullData}
                  />
                }
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <div className="mx-8 mb-10 mt-8 md:mb-12 lg:mt-10">
        {loading === HTTP_STATUS.FULFILLED && list.length > 0 && (
          <Pagination pageCount={pageCount} setPageNumber={setPageNumber} />
        )}
      </div>
    </div>
  );
};

export default CocktailsGrid;
