import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoList } from "../../app/features/youtubeSlice";
import useWindowSize from "../../hooks/useWindowSize";

const VideoTutorial = ({ cocktail, loading }) => {
  const dispatch = useDispatch();
  const [videoIndex, setVideoIndex] = useState(0);

  const youtubeLoading = useSelector((state) => state.youtube.loading);

  useEffect(() => {
    if (loading === "fulfilled") {
      const promise = dispatch(fetchVideoList(cocktail.drink));
      return () => {
        promise.abort();
      };
    }
  }, [loading]);

  return (
    <section id="video-guide">
      <div className="px-4 md:px-10 lg:px-20 my-6 md:my-8 w-full flex justify-center">
        {loading === "fulfilled" &&
          youtubeLoading === "fulfilled" && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-app-cadet font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
                Video Tutorials Not Available
              </p>
            </div>
          )}
        {youtubeLoading === "rejected" && (
          <div className="w-full p-4">
            <p className="text-app-flame font-app-heading text-[16px] md:text-[18px] lg:text-[20px] font-bold text-center">
              Video Tutorials Not Available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoTutorial;
