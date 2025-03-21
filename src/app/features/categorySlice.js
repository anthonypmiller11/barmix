import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchByCategory = createAsyncThunk(
  "category/fetchByCategory",
  async (categoryIndex, { rejectWithValue }) => {
    try {
      const category = ["Cocktail", "Shot", "Punch / Party Drink"][categoryIndex];
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      return response.data.drinks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    cocktails: [],
    loading: "PENDING",
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
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
