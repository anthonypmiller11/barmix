import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HTTP_STATUS } from "../../app/utils/constants";
import { Pagination } from "../";
import SearchCard from "./SearchCard";
import { cocktailsGridAnimation } from "../../app/utils/animationsHelper";

const SearchItemsGrid = ({ list, loading, perPage, error }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = perPage ?? 8;
  const itemsVisited = pageNumber * itemsPerPage;
  const displayItems = list.slice(itemsVisited, itemsVisited + itemsPerPage);
  const pageCount = Math.ceil(list.length / itemsPerPage);

  useEffect(() => {
    setPageNumber(0);
  }, [list]);

  if (!Array.isArray(list)) {
    console.error("Error: 'list' is not an array."); // Log error for invalid data
    return <p>Error: Invalid data format for search items.</p>;
  }

  if (list.length === 0) {
    return <p>No items found.</p>; // Fallback message for empty results
  }

  return (
    <div>
      {loading === HTTP_STATUS.FULFILLED && list.length === 0 && (
        <div className="w-full p-4">
          <p className="text-app-cadet font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
            No items to display.
          </p>
        </div>
      )}

      {loading === HTTP_STATUS.REJECTED && error !== "Aborted" && (
        <div className="w-full p-4">
          <p className="text-app-flame font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
            Oops!! No Cocktails Found.
          </p>
        </div>
      )}

      {loading === HTTP_STATUS.PENDING && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[16px] lg:gap-[20px] xl:gap-[25px]">
          {[...Array(itemsPerPage)].map((_item, index) => (
            <div
              key={index}
              className="w-full h-[200px] bg-gray-200 animate-pulse rounded-md"
            >
              {/* Placeholder for loading */}
            </div>
          ))}
        </div>
      )}

      {loading === HTTP_STATUS.FULFILLED && list.length > 0 && (
        <motion.div
          layoutId="searchGrid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[16px] lg:gap-[20px] xl:gap-[25px]"
        >
          {displayItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                className="w-full h-[200px] bg-white shadow-md rounded-md"
              >
                {/* Render actual item content here */}
                <p className="text-center font-bold">{item.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {loading === HTTP_STATUS.FULFILLED && list.length > 0 && (
        <div className="mx-8 mt-6 md:mt-8 mb-1 lg:mt-10">
          <Pagination pageCount={pageCount} setPageNumber={setPageNumber} />
        </div>
      )}
    </div>
  );
};

export default SearchItemsGrid;
