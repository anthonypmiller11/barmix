import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { glassTypes } from "../utils/data";
import { organizeCocktailList } from "../utils/helpers";

export const fetchByGlass = createAsyncThunk(
  "glass/fetchByGlass",
  async (type, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    try {
      // Ensure valid glass type
      const selectedGlass = glassTypes[type];
      if (!selectedGlass) {
        throw new Error("Invalid glass type");
      }

      // Load local JSON
      const response = await axios.get("/data/cocktail_recipes.json", {
        cancelToken: source.token,
      });

      const allCocktails = response.data.drinks || [];

      // Filter by glass type
      const filtered = allCocktails.filter(drink =>
        drink.strGlass?.toLowerCase() === selectedGlass.toLowerCase()
      );

      return organizeCocktailList(filtered);
    } catch (error) {
      throw new Error("Could not load cocktails by glass type.");
    }
  }
);

const initialState = {
  cocktails: [],
  loading: null,
  error: null,
};

export const glassSlice = createSlice({
  name: "glass",
  initialState,
  extraReducers: {
    [fetchByGlass.pending]: (state) => {
      state.cocktails = [];
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchByGlass.fulfilled]: (state, action) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktails = action.payload;
    },
    [fetchByGlass.rejected]: (state, action) => {
      state.cocktails = [];
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default glassSlice.reducer;
