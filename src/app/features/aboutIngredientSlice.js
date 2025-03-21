import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { organizeIngredient } from "../utils/helpers";

export const fetchIngredientDetails = createAsyncThunk(
  "aboutIngredient/fetchIngredientDetails",
  async (ingredient, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    try {
      // Load ingredients from local JSON
      const response = await axios.get("/data/ingredients.json", {
        cancelToken: source.token,
      });

      const ingredientList = response.data.ingredients;
      
      // Find the requested ingredient (FIXED: Accessing name property)
      const found = ingredientList.find(item => 
        item.name.toLowerCase() === ingredient.toLowerCase()
      );

      if (!found) {
        throw new Error("Ingredient not found");
      }

      // Structure response similar to API format (FIXED: Correct image path)
      const ingredientData = {
        strIngredient: found.name, 
        description: found.description || "This ingredient is used in multiple cocktails.",
        type: found.type || "Unknown",
        alcohol: found.alcohol || "No",
        abv: found.abv || "-",
        image: `/images/ingredients/${found.name.replace(/\s+/g, "_")}-medium.png` // Fixed filename format
      };

      return organizeIngredient ? organizeIngredient(ingredientData) : ingredientData;
    } catch (error) {
      throw new Error("Error loading ingredients.");
    }
  }
);

const initialState = {
  ingredient: {},
  loading: null,
  error: null,
};

export const aboutIngredientSlice = createSlice({
  name: "aboutIngredient",
  initialState,
  extraReducers: {
    [fetchIngredientDetails.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchIngredientDetails.fulfilled]: (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.ingredient = payload;
    },
    [fetchIngredientDetails.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default aboutIngredientSlice.reducer;
