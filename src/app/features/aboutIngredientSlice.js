import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { organizeIngredient } from "../utils/helpers";
import cocktailRecipes from "../../data/cocktail_recipes.json";

export const fetchIngredientDetails = createAsyncThunk(
  "aboutIngredient/fetchIngredientDetails",
  async (ingredient, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    try {
      // Validate input
      if (!ingredient || typeof ingredient !== "string") {
        throw new Error("Invalid ingredient provided.");
      }
      console.log("Fetching details for ingredient:", ingredient);

      // Load ingredients from local JSON
      const response = await axios.get("../../data/ingredients.json", { // Adjusted path
        cancelToken: source.token,
      });
      console.log("Fetched ingredient data:", response.data);

      const ingredientList = response.data.ingredients;

      // Find the requested ingredient
      const found = ingredientList.find(
        (item) => item.name.toLowerCase() === ingredient.toLowerCase()
      );

      if (!found) {
        throw new Error(`Ingredient "${ingredient}" not found.`);
      }

      // Structure response similar to API format
      const ingredientData = {
        strIngredient: found.name,
        description:
          found.description || "This ingredient is used in multiple cocktails.",
        type: found.type || "Unknown",
        alcohol: found.alcohol || "No",
        abv: found.abv || "-",
        image: `../../images/ingredients/${found.name
          .replace(/\s+/g, "_")
          .toLowerCase()}-medium.png`, // Adjusted path
      };

      console.log("Organized ingredient data:", ingredientData);

      return organizeIngredient ? organizeIngredient(ingredientData) : ingredientData;
    } catch (error) {
      console.error("Error fetching ingredient details:", error.message);
      throw new Error(error.response?.data?.message || "Error loading ingredients.");
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
      console.log("Fetching ingredient details: pending...");
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchIngredientDetails.fulfilled]: (state, { payload }) => {
      console.log("Fetching ingredient details: fulfilled", payload);
      state.loading = HTTP_STATUS.FULFILLED;
      state.ingredient = payload;
    },
    [fetchIngredientDetails.rejected]: (state, action) => {
      console.error("Fetching ingredient details: rejected", action.error.message);
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default aboutIngredientSlice.reducer;
