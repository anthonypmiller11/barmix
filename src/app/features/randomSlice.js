import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizeCocktail } from "../utils/helpers";

const initialState = {
  cocktail: null,
  loading: "idle",
  error: null,
};

const randomSlice = createSlice({
  name: "random",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomDrink.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchRandomDrink.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktail = action.payload;
      })
      .addCase(fetchRandomDrink.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchRandomDrink = createAsyncThunk(
  "random/fetchRandomDrink",
  async () => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    const randomCocktail = data[0][Math.floor(Math.random() * data[0].length)];
    return organizeCocktail(randomCocktail);
  }
);

export default randomSlice.reducer;
