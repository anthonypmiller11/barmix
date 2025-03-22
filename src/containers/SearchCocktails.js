import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCocktails, resetSearch } from "../app/features/searchSlice";
import { calcSearchGrid } from "../app/utils/helpers";
import { SearchItemsGrid } from "../components";
import useDebounce from "../hooks/useDebounce";
import useWindowSize from "../hooks/useWindowSize";

const SearchCocktails = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const cocktails = useSelector((state) => state.search.cocktails);
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);

  const debounceSearch = useDebounce(searchText.trim(), 1000);
  const size = useWindowSize();

  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (debounceSearch !== "") {
      const promise = dispatch(searchCocktails(debounceSearch));
      return () => {
        promise.abort();
      };
    } else {
      dispatch(resetSearch());
    }
  }, [debounceSearch, dispatch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search cocktails..."
        value={searchText}
        onChange={onChangeHandler}
      />
      <button>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <SearchItemsGrid items={cocktails} gridConfig={calcSearchGrid(size)} />
      )}
    </div>
  );
};

export default SearchCocktails;
