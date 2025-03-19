import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { showSearchModal } from "../../app/features/modalSlice";
import { skeletonGrid } from "../../app/utils/animationsHelper";
import { DummyCocktail } from "../../app/utils/data";
import LinkButton from "../buttons/LinkButton";
import SearchCard from "./SearchCard";

const SearchItemsGrid = ({ list, loading, error, perPage }) => {
  const dispatch = useDispatch();
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const openSearch = () => {
    dispatch(showSearchModal());
  };

  useEffect(() => {
    if (list !== null) {
      setCocktails(list);
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
  const currentCocktails = cocktails.slice(startIndex, endIndex);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {[...Array(perPage)].map((_, index) => (
            <SearchCard key={index} cocktail={DummyCocktail} loading={true} />
          ))}
        </div>
      )}
      {loading === "fulfilled" && cocktails.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {currentCocktails.map((cocktail) => (
            <SearchCard key={cocktail.id} cocktail={cocktail} loading={false} />
          ))}
        </div>
      )}
      {loading === "fulfilled" && cocktails.length === 0 && (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-app-cadet font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
            No Cocktails Found!
          </p>
          <LinkButton onClick={openSearch} text="Search Something Else" />
        </div>
      )}
      {loading === "rejected" && (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-app-flame font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
            {error}
          </p>
          <LinkButton onClick={openSearch} text="Search Something Else" />
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
              "rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center font-app-main text-[12px] md:text-[14px] lg:text-[16px] text-app-cadet hover:bg-app-flame hover:text-white cursor-pointer"
            }
            activeClassName={"bg-app-flame text-white"}
            previousClassName={
              "rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center font-app-main text-[12px] md:text-[14px] lg:text-[16px] text-app-cadet hover:bg-app-flame hover:text-white cursor-pointer"
            }
            nextClassName={
              "rounded-full w-8 h-8 md:w-10 md:h-10 flex justify-center items-center font-app-main text-[12px] md:text-[14px] lg:text-[16px] text-app-cadet hover:bg-app-flame hover:text-white cursor-pointer"
            }
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SearchItemsGrid;
