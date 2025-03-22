// src/app/features/randomSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import cocktailRecipes from "../../data/cocktail_recipes.json"; // Adjusted path to match directory structure

export const fetchRandomDrink = createAsyncThunk(
  "random/fetchRandomDrink",
  async (_, { rejectWithValue }) => {
    try {
      // Ensure cocktailRecipes is not empty
      if (!cocktailRecipes || !cocktailRecipes.drinks || cocktailRecipes.drinks.length === 0) {
        throw new Error("No cocktails available in the dataset.");
      }

      // Select a random drink
      const randomIndex = Math.floor(Math.random() * cocktailRecipes.drinks.length);
      const randomDrink = cocktailRecipes.drinks[randomIndex];

      console.log("Random drink selected:", randomDrink); // Debugging log
      return randomDrink;
    } catch (error) {
      console.error("Error fetching random drink:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const randomSlice = createSlice({
  name: "random",
  initialState: {
    cocktail: null,
    loading: HTTP_STATUS.IDLE,
    error: null,
  },
  reducers: {
    clearRandomDrink: (state) => {
      state.cocktail = null;
      state.loading = HTTP_STATUS.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomDrink.pending, (state) => {
        state.loading = HTTP_STATUS.PENDING;
        state.error = null;
      })
      .addCase(fetchRandomDrink.fulfilled, (state, action) => {
        state.loading = HTTP_STATUS.FULFILLED;
        state.cocktail = action.payload;
      })
      .addCase(fetchRandomDrink.rejected, (state, action) => {
        state.loading = HTTP_STATUS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export const { clearRandomDrink } = randomSlice.actions;
export default randomSlice.reducer;
