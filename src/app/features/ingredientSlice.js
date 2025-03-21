import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../app/utils/constants";
import axios from "axios";

export const fetchIngredients = createAsyncThunk(
  "ingredient/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ingredients.json`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredients: [],
    loading: "PENDING",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = "PENDING";
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = "FULFILLED";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = "REJECTED";
        state.error = action.payload;
      });
  },
});

export default ingredientSlice.reducer;
