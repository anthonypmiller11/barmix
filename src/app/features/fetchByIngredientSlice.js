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

    // Load full recipe list from local JSON
    const response = await axios.get("/data/cocktail_recipe.json", {
      cancelToken: source.token,
    });

    // Filter cocktails that contain the selected ingredient
    const filteredCocktails = response.data.drinks.filter(drink =>
      Object.keys(drink)
        .filter(key => key.startsWith("strIngredient"))
        .some(key => drink[key]?.toLowerCase() === id.toLowerCase())
    );

    return organizeCocktailList(filteredCocktails); // Keeps existing data structure
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
