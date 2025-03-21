// src/app/features/randomSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import cocktailRecipes from "../../../data/cocktail_recipes.json"; // Adjust the path as needed

export const fetchRandomDrink = createAsyncThunk(
  "random/fetchRandomDrink",
  async (_data, { signal }) => {
    // Simulate a fetch by selecting a random drink from cocktail_recipes.json
    const randomIndex = Math.floor(Math.random() * cocktailRecipes.length);
    return cocktailRecipes[randomIndex];
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
