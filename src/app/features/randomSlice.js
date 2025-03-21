import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { organizeCocktail } from "../utils/helpers";

export const fetchRandomDrink = createAsyncThunk(
  "random/fetchRandomDrink",
  async (_data, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    try {
      // Load full recipe list from local JSON
      const response = await axios.get("/data/cocktail_recipes.json", {
        cancelToken: source.token,
      });

      const allDrinks = response.data.drinks || [];

      if (allDrinks.length === 0) {
        throw new Error("No cocktails available.");
      }

      // Select a random cocktail
      const randomIndex = Math.floor(Math.random() * allDrinks.length);
      const randomCocktail = allDrinks[randomIndex];

      return organizeCocktail(randomCocktail);
    } catch (error) {
      throw new Error("Failed to load random cocktail.");
    }
  }
);

const initialState = {
  randomCocktail: {},
  loading: null,
  error: null,
};

export const randomSlice = createSlice({
  name: "random",
  initialState: initialState,
  extraReducers: {
    [fetchRandomDrink.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchRandomDrink.fulfilled]: (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.randomCocktail = payload;
    },
    [fetchRandomDrink.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default randomSlice.reducer;
