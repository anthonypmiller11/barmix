import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizeCocktailList } from "../utils/helpers";

const initialState = {
  cocktails: [],
  loading: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktails = action.payload;
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchByCategory = createAsyncThunk(
  "category/fetchByCategory",
  async (type) => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    const filtered = data[0].filter(cocktail => 
      cocktail.strCategory.toLowerCase() === type.toLowerCase()
    );
    return organizeCocktailList(filtered);
  }
);

export default categorySlice.reducer;
