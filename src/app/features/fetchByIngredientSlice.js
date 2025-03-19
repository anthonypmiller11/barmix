import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { containsIngredient, organizeCocktailList } from "../utils/helpers";

const initialState = {
  cocktails: [],
  loading: "idle",
  error: null,
};

const fetchByIngredientSlice = createSlice({
  name: "fetchByIngredient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByIngredient.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchByIngredient.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktails = action.payload;
      })
      .addCase(fetchByIngredient.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchByIngredient = createAsyncThunk(
  "fetchByIngredient/fetchByIngredient",
  async (ingredient) => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    const filtered = data[0].filter(cocktail => 
      containsIngredient(cocktail, [ingredient])
    );
    return organizeCocktailList(filtered);
  }
);

export default fetchByIngredientSlice.reducer;
