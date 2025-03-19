import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizeIngredients } from "../utils/helpers";

const initialState = {
  ingredients: [],
  loading: "idle",
  error: null,
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchIngredients = createAsyncThunk(
  "ingredient/fetchIngredients",
  async () => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    const ingredients = new Set();
    data[0].forEach(cocktail => {
      for (let i = 1; i <= 8; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        if (ingredient) {
          ingredients.add(ingredient.trim());
        }
      }
    });
    const ingredientList = Array.from(ingredients);
    return organizeIngredients(ingredientList);
  }
);

export default ingredientSlice.reducer;
