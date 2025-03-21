import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { organizeCocktail } from "../utils/helpers";

export const fetchCocktailDetails = createAsyncThunk(
  "details/fetchCocktailDetails",
  async (id, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await axios.get("/data/cocktail_recipes.json", {
      cancelToken: source.token,
    });

    const allDrinks = response.data.drinks || [];

    // Match by string to avoid type mismatch issues
    const match = allDrinks.find(drink => drink.idDrink === id.toString());

    if (!match) {
      throw new Error(`Cocktail with ID ${id} not found`);
    }

    return organizeCocktail(match);
  }
);

const initialState = {
  cocktail: {},
  loading: null,
  error: null,
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  extraReducers: {
    [fetchCocktailDetails.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchCocktailDetails.fulfilled]: (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktail = payload;
    },
    [fetchCocktailDetails.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default detailsSlice.reducer;
