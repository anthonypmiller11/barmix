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
    console.log("Fetching cocktail with ID:", id);
    try {
      const response = await fetch("/data/cocktailrecipes.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      const cocktail = data[0].find(c => {
        console.log("Comparing:", c.idDrink, "with", String(id), "Types:", typeof c.idDrink, typeof String(id));
        return c.idDrink === String(id);
      });
      console.log("Found cocktail:", cocktail);
      if (!cocktail) {
        throw new Error("Cocktail not found");
      }
      return organizeCocktail(cocktail);
    } catch (error) {
      console.error("Fetch error:", error.message);
      throw error;
    }
  }
);

export default detailsSlice.reducer;
