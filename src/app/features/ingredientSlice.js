import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { organizeIngredients } from "../utils/helpers";

export const fetchIngredients = createAsyncThunk(
  "ingredient/fetchIngredients",
  async (_data, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    try {
      // Load local ingredients data
      const response = await axios.get("/data/ingredients.json", {
        cancelToken: source.token,
      });

      const ingredientList = response.data.ingredients || [];

      return organizeIngredients ? organizeIngredients(ingredientList) : ingredientList;
    } catch (error) {
      throw new Error("Could not load ingredients.");
    }
  }
);

const initialState = {
  ingredients: [],
  loading: null,
  error: null,
};

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  extraReducers: {
    [fetchIngredients.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.ingredients = action.payload;
    },
    [fetchIngredients.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default ingredientSlice.reducer;
