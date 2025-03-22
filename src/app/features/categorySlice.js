// src/app/features/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch cocktails by category from static cocktail_recipes.json in public/
export const fetchByCategory = createAsyncThunk(
  "category/fetchByCategory",
  async (categoryIndex, { rejectWithValue }) => {
    try {
      // Map index to category type from your categoryData.js
      const categoryTypes = ["Spirit", "Strengths", "Flavor", "Style", "Mood", "Occasion"];
      if (categoryIndex < 0 || categoryIndex >= categoryTypes.length) {
        return rejectWithValue("Invalid category index"); // Handle invalid index
      }
      const categoryType = categoryTypes[categoryIndex];

      // Fetch static JSON from public/
      const response = await fetch('cocktail_recipes.json'); // Removed leading slash
      if (!response.ok) throw new Error('Failed to load cocktail recipes');
      const allRecipes = await response.json();

      // Return cocktails for this category type (e.g., { Vodka: [...], Tequila: [...] })
      return allRecipes[categoryType] || {};
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred while fetching categories");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    cocktails: {}, // Object for sub-categories
    loading: "IDLE",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.loading = "PENDING";
        state.error = null;
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = "FULFILLED";
        state.cocktails = action.payload;
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.loading = "REJECTED";
        state.error = action.payload || "An error occurred"; // Provide fallback error message
      });
  },
});

export default categorySlice.reducer;
