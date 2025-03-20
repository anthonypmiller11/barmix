import React from "react";
import { HTTP_STATUS } from "../../app/utils/constants";

const IngredientDetailsTile = ({loading, title, text}) => {
  return (
    <div className="flex flex-col justify-center items-center my-[10px] md:my-2 px-2 md:px-4 w-full">
      {loading !== HTTP_STATUS.FULFILLED && (
        <div className="w-full space-y-1">
          <p className="loading animate-loading text-[17px] text-slate-100 text-center truncate leading-5">
            ...
          </p>
        </div>
      )}

      {loading === HTTP_STATUS.FULFILLED && (
        <p className="text-[16px] md:text-[17px] lg:text-[18px] font-app-text text-app-cadet text-center">
          {text}
        </p>
      )}
      <p className="text-[15px] md:text-[16px] lg:text-[17px] font-app-main text-app-olivine text-center tracking-wider">
        {title}
      </p>
    </div>
  );
};

export default IngredientDetailsTile;
