import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { categoryTypes } from "../utils/data";
import { organizeCocktailList } from "../utils/helpers";

export const fetchByCategory = createAsyncThunk(
  "category/fetchByCategory",
  async ({ type, value }, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    try {
      // Load all cocktails from local JSON
      const response = await axios.get("/data/cocktail_recipes.json", {
        cancelToken: source.token,
      });

      const allCocktails = response.data.drinks || [];

      // Ensure valid category type
      if (!categoryTypes[type]) {
        throw new Error("Invalid category type");
      }

      // Ensure valid value exists in that category
      if (!categoryTypes[type].includes(value)) {
        throw new Error("Invalid category value");
      }

      // Filter cocktails based on tags
      const filteredCocktails = allCocktails.filter(drink =>
        drink.strTags &&
        drink.strTags
          .split(",")
          .map(tag => tag.trim().toLowerCase())
          .includes(value.toLowerCase())
      );

      return organizeCocktailList(filteredCocktails);
    } catch (error) {
      throw new Error("Error filtering cocktails by category.");
    }
  }
);

const initialState = {
  cocktails: [],
  loading: null,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  extraReducers: {
    [fetchByCategory.pending]: (state) => {
      state.cocktails = [];
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchByCategory.fulfilled]: (state, action) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktails = action.payload;
    },
    [fetchByCategory.rejected]: (state, action) => {
      state.cocktails = [];
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default categorySlice.reducer;
