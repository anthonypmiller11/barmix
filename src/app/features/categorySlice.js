import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { categoryTypes } from "../utils/data";
import { organizeCocktailList } from "../utils/helpers";

export const fetchByCategory = createAsyncThunk(
  "category/fetchByCategory",
  async (type, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    // Validate the requested type exists
    const selectedTag = categoryTypes[type]; // This maps to your tag name
    if (!selectedTag) throw new Error("Invalid category type");

    // Load local data
    const response = await axios.get("/data/cocktail_recipes.json", {
      cancelToken: source.token,
    });

    const allCocktails = response.data.drinks || [];

    // Filter by strTags (case-insensitive match)
    const filtered = allCocktails.filter(drink =>
      drink.strTags &&
      drink.strTags
        .split(",")
        .map(tag => tag.trim().toLowerCase())
        .includes(selectedTag.toLowerCase())
    );

    return organizeCocktailList(filtered);
  }
);

const initialState = {
  cocktails: [],
  loading: null,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
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
