import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import { organizeCocktailList } from "../utils/helpers";
import cocktailRecipes from "../../data/cocktail_recipes.json"; // Adjusted path

export const fetchByAlcoholic = createAsyncThunk(
  "alcoholic/fetchByAlcoholic",
  async (alcoholicType, { rejectWithValue }) => {
    if (!alcoholicType) {
      return rejectWithValue("Alcoholic type is required"); // Handle missing input
    }

    const allCocktails = cocktailRecipes.drinks || []; // Access data directly

    // Filter drinks by alcoholic status
    const filtered = allCocktails.filter(
      (drink) =>
        drink.strAlcoholic &&
        drink.strAlcoholic.toLowerCase() === alcoholicType.toLowerCase()
    );

    return organizeCocktailList(filtered);
  }
);

const initialState = {
  cocktails: [],
  loading: null,
  error: null,
};

export const alcoholicSlice = createSlice({
  name: "alcoholic",
  initialState,
  extraReducers: {
    [fetchByAlcoholic.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchByAlcoholic.fulfilled]: (state, action) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktails = action.payload;
    },
    [fetchByAlcoholic.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.payload || action.error?.message || "An error occurred"; // Prioritize custom error message
    },
  },
});

export default alcoholicSlice.reducer;
