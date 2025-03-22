import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import { organizeCocktailList } from "../utils/helpers";
import cocktailRecipes from "../../data/cocktail_recipes.json"; // Adjusted path to match directory structure

export const initialFetch = createAsyncThunk(
  "cocktails/initialFetch",
  async () => {
    const drinks = cocktailRecipes.drinks || []; // Access data directly
    console.log("Fetched drinks:", drinks); // Log the fetched drinks array

    // Return the first 24 cocktails
    return organizeCocktailList(drinks.slice(0, 24));
  }
);

export const fetchByFirstLetter = createAsyncThunk(
  "cocktails/fetchByFirstLetter",
  async (letter) => {
    const drinks = cocktailRecipes.drinks || []; // Access data directly

    // Filter cocktails starting with the given letter (case-insensitive)
    const filtered = drinks.filter(drink =>
      drink.strDrink?.toLowerCase().startsWith(letter.toLowerCase())
    );

    return organizeCocktailList(filtered, 24);
  }
);

const initialState = {
  cocktails: [],
  selectedLetter: "",
  loading: null,
  error: null,
};

export const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState: initialState,
  reducers: {
    onLetterClick: (state, { payload }) => {
      state.selectedLetter = payload;
    },
  },
  extraReducers: {
    [initialFetch.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [initialFetch.fulfilled]: (state, action) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktails = action.payload;
    },
    [initialFetch.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error?.message || "An error occurred"; // Added fallback error message
    },
    [fetchByFirstLetter.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchByFirstLetter.fulfilled]: (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktails = payload;
    },
    [fetchByFirstLetter.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error?.message || "An error occurred"; // Added fallback error message
    },
  },
});

export const { onLetterClick } = cocktailsSlice.actions;

export default cocktailsSlice.reducer;
