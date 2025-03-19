import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizeCocktailList } from "../utils/helpers";

const initialState = {
  cocktails: [],
  loading: "idle",
  error: null,
};

const alcoholicSlice = createSlice({
  name: "alcoholic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByAlcoholic.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchByAlcoholic.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktails = action.payload;
      })
      .addCase(fetchByAlcoholic.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchByAlcoholic = createAsyncThunk(
  "alcoholic/fetchByAlcoholic",
  async (type) => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    const filtered = data[0].filter(cocktail => 
      cocktail.strAlcoholic.toLowerCase() === type.toLowerCase()
    );
    return organizeCocktailList(filtered);
  }
);

export default alcoholicSlice.reducer;
