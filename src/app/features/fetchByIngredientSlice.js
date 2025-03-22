import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import { organizeCocktailList } from "../utils/helpers";
import cocktailRecipes from "../../data/cocktail_recipes.json"; // Corrected filename

export const fetchByIngredient = createAsyncThunk(
  "fetchByIngredient/fetchByIngredient",
  async (ingredient, { rejectWithValue }) => {
    try {
      const allCocktails = cocktailRecipes.drinks;
      if (!Array.isArray(allCocktails)) {
        throw new Error("Invalid cocktail data structure.");
      }

      // Filter cocktails containing the given ingredient
      const filteredCocktails = allCocktails.filter(drink =>
        Object.keys(drink)
          .filter(key => key.startsWith("strIngredient"))
          .some(key =>
            drink[key] && drink[key].toLowerCase().trim() === ingredient.toLowerCase().trim()
          )
      );

      return organizeCocktailList(filteredCocktails);
    } catch (error) {
      console.error("Error fetching cocktails by ingredient:", error.message);
      return rejectWithValue("Could not load cocktails by ingredient.");
    }
  }
);

const initialState = {
  cocktails: [], // Ensure this matches the expected structure
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
