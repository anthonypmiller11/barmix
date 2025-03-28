import React from "react";
import { HTTP_STATUS } from "../../app/utils/constants";

const InfoCard = ({ title, data, loading }) => {
  return (
    <>
      {loading !== HTTP_STATUS.FULFILLED && (
        <>
          <div className="loading animate-loading flex flex-col justify-center items-center rounded-lg border-[3px] border-dashed w-full h-auto px-4 py-2">
            <div className="w-full space-y-1">
              <p className="loading animate-loading text-[14px] text-slate-100 text-center truncate leading-5">
                ...
              </p>
              <p className="loading animate-loading text-[14px] text-slate-100 text-center truncate leading-5">
                ...
              </p>
            </div>
          </div>
        </>
      )}

      {loading === HTTP_STATUS.FULFILLED && (
        <>
          <div className="flex flex-col justify-center items-center rounded-lg border-[3px] border-dashed w-full h-full px-4 lg:px-8 py-2 cursor-default">
            <p className="text-[15px] md:text-[16px] lg:text-[17px] font-app-text text-app-cadet text-center">
              {data}
            </p>
            <p className="text-[13px] md:text-[14px] lg:text-[15px] font-app-main text-app-olivine text-center tracking-wider">
              {title}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default InfoCard;
