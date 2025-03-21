import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { organizeCocktailList } from "../utils/helpers";

export const fetchByIngredient = createAsyncThunk(
  "fetchByIngredient/fetchByIngredient",
  async (id, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    try {
      const response = await axios.get("/data/cocktail_recipe.json", {
        cancelToken: source.token,
      });

      const allCocktails = response.data.drinks || [];

      // Filter cocktails containing the given ingredient
      const filteredCocktails = allCocktails.filter(drink =>
        Object.keys(drink)
          .filter(key => key.startsWith("strIngredient"))
          .some(key => 
            drink[key]?.toLowerCase().trim() === id.toLowerCase().trim()
          )
      );

      return organizeCocktailList(filteredCocktails);
    } catch (error) {
      throw new Error("Could not load cocktails by ingredient.");
    }
  }
);

const initialState = {
  cocktails: [],
  loading: null,
  error: null,
};

export const fetchByIngredientSlice = createSlice({
  name: "fetchByIngredient",
  initialState,
  extraReducers: {
    [fetchByIngredient.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchByIngredient.fulfilled]: (state, action) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktails = action.payload;
    },
    [fetchByIngredient.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default fetchByIngredientSlice.reducer;
