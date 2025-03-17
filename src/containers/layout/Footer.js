import React from "react";
import { Link } from "react-router-dom";
import { TbArrowBigUpLines } from "react-icons/tb";
import { animateScroll as scroll } from "react-scroll";
import { alcoholicTypes, categoryTypes, Menu } from "../../app/utils/data";

const Footer = () => {
  const scrollToTop = () => {
    return scroll.scrollToTop({
      duration: 500,
      delay: 150,
      smooth: "easeInCubic",
    });
  };

  return (
    <footer className="bg-app-cadet w-full h-auto relative">
      <>
        <div className="flex justify-center md:flex-col lg:flex-row py-4 md:py-6 px-12 lg:px-20 xl:px-32 lg:py-10">
          <div className="flex justify-center md:justify-evenly w-full">
            <div className="lg:flex-[3] flex flex-col md:hidden lg:flex justify-center items-center lg:items-start lg:justify-start">
              <div className="flex md:hidden mt-3 justify-center gap-4 w-full px-1">
                {Menu.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={item.link}
                      className="text-start w-max text-[11px] font-app-main text-white basic-transition cursor-pointer mb-1"
                    >
                      {item.menu}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex-[3] hidden md:flex flex-col justify-start w-full px-1">
              {alcoholicTypes.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={`/alcoholic?id=${index}`}
                    className="text-start w-max text-[13px] font-app-main text-white md:hover:text-app-flame basic-transition cursor-pointer mb-1 capitalize"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
            <div className="flex-[9] hidden md:block w-full">
              <div className="grid grid-cols-3 items-center gap-1">
                {categoryTypes.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/categories?id=${index}`}
                      className="text-center w-max text-[13px] font-app-main text-white md:hover:text-app-flame basic-transition cursor-pointer capitalize"
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => scrollToTop()}
          className="active:scale-95 rounded-md bg-app-cadet md:hover:bg-app-flame ring-[2px] md:ring-[3px] ring-white absolute -top-[14px] md:-top-4 right-4 md:right-[40px] lg:right-16 p-2 drop-shadow-md group hover:cursor-pointer basic-transition"
        >
          <TbArrowBigUpLines className="w-4 h-4 md:w-5 md:h-5 text-white shadow-sm group-hover:animate-expand" />
        </div>
      </>
      <div className="w-full flex justify-center py-1 bg-app-flame/80">
        <p className="text-[15px] text-white font-app-heading tracking-wider">
        </p>
      </div>
    </footer>
  );
};

export default Footer;
