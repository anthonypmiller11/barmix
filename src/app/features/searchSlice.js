import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizeCocktailList } from "../utils/helpers";

const initialState = {
  cocktails: [],
  loading: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCocktails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(searchCocktails.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktails = action.payload;
      })
      .addCase(searchCocktails.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const searchCocktails = createAsyncThunk(
  "search/searchCocktails",
  async (query) => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    const filtered = data[0].filter(cocktail =>
      cocktail.strDrink.toLowerCase().includes(query.toLowerCase())
    );
    return organizeCocktailList(filtered);
  }
);

export default searchSlice.reducer;
