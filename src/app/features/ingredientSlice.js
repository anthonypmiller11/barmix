import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ingredientsData from "../../data/ingredients.json"; // Import the local JSON file

export const fetchIngredients = createAsyncThunk(
  "ingredient/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      // Use the local JSON file instead of an API call
      return ingredientsData.ingredients.map(item => ({
        strIngredient1: item.name,
        image: item.image,
      }));
    } catch (error) {
      console.error("Error fetching ingredients:", error.message);
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
