import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { organizeCocktailList } from "../utils/helpers";

export const searchCocktails = createAsyncThunk(
  "search/searchCocktails",
  async (search, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    try {
      // Load full recipe list from local JSON
      const response = await axios.get("../data/cocktail_recipes.json", {
        cancelToken: source.token,
      });

      const allCocktails = response.data.drinks || [];

      // Filter cocktails matching the search term (case insensitive)
      const matchedCocktails = allCocktails.filter(drink =>
        drink.strDrink.toLowerCase().includes(search.toLowerCase())
      );

      return organizeCocktailList(matchedCocktails, 16);
    } catch (error) {
      throw new Error("Failed to search cocktails.");
    }
  }
);

const initialState = {
  cocktails: [],
  loading: null,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    resetSearch: (state) => {
      state.cocktails = [];
      state.loading = null;
      state.error = null;
    },
  },
  extraReducers: {
    [searchCocktails.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [searchCocktails.fulfilled]: (state, action) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktails = action.payload;
    },
    [searchCocktails.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export const { resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
