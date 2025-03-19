import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizeCocktail } from "../utils/helpers";

const initialState = {
  cocktail: null,
  loading: "idle",
  error: null,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktailDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCocktailDetails.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktail = action.payload;
      })
      .addCase(fetchCocktailDetails.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchCocktailDetails = createAsyncThunk(
  "details/fetchCocktailDetails",
  async (id) => {
    console.log("Fetching cocktail with ID:", id); // Debug: Log the ID being passed
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    console.log("Fetched data:", data); // Debug: Log the fetched data
    const cocktail = data[0].find(c => c.idDrink === String(id));
    console.log("Found cocktail:", cocktail); // Debug: Log the found cocktail
    if (!cocktail) {
      throw new Error("Cocktail not found");
    }
    return organizeCocktail(cocktail);
  }
);

export default detailsSlice.reducer;
