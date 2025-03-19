import React, { useEffect, useState } from "react";
import { Quotes } from "../../app/utils/data";

const CocktailQuote = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const shuffled = Quotes.sort(() => 0.5 - Math.random());
    setQuote(shuffled[0]);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 md:px-6 lg:px-20 my-6 md:my-8 lg:my-12">
      <p className="text-app-cadet font-app-quote text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center italic">
        "{quote.quote}"
      </p>
      <p className="text-app-flame font-app-heading text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-center mt-2">
        — {quote.author}
      </p>
    </div>
  );
};

export default CocktailQuote;
