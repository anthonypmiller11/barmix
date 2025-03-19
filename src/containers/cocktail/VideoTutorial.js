import React from "react";
import { HTTP_STATUS } from "../../app/utils/constants";

const VideoTutorial = ({ cocktail, loading }) => {
  return (
    <section id="video-guide">
      <div className="px-4 md:px-10 lg:px-20 my-6 md:my-8 w-full flex justify-center">
        {loading === HTTP_STATUS.FULFILLED && (
          <div className="w-full p-4">
            <p className="text-app-cadet font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
              Video tutorials are not available in this version.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoTutorial;
