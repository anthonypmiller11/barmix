import { useEffect } from "react";

export const useTitle = (title, loading) => {
  useEffect(() => {
    const prevTitle = document.title;
    if (loading === "fulfilled") {
      document.title = title;
    }
    return () => {
      document.title = prevTitle;
    };
  }, [title, loading]);
};
