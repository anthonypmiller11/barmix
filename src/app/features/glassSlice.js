import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizeCocktailList } from "../utils/helpers";

const initialState = {
  cocktails: [],
  loading: "idle",
  error: null,
};

const glassSlice = createSlice({
  name: "glass",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByGlass.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchByGlass.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktails = action.payload;
      })
      .addCase(fetchByGlass.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchByGlass = createAsyncThunk(
  "glass/fetchByGlass",
  async (type) => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    const filtered = data[0].filter(cocktail => 
      cocktail.strGlass.toLowerCase() === type.toLowerCase()
    );
    return organizeCocktailList(filtered);
  }
);

export default glassSlice.reducer;
