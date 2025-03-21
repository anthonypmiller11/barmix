import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HTTP_STATUS } from "../utils/constants";
import { organizeCocktailList } from "../utils/helpers";

export const fetchByAlcoholic = createAsyncThunk(
  "alcoholic/fetchByAlcoholic",
  async (alcoholicType, { signal }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await axios.get("/data/cocktail_recipes.json", {
      cancelToken: source.token,
    });

    // Filter drinks by alcoholic status
    const allCocktails = response.data.drinks || [];
    const filtered = allCocktails.filter(
      (drink) =>
        drink.strAlcoholic &&
        drink.strAlcoholic.toLowerCase() === alcoholicType.toLowerCase()
    );

    return organizeCocktailList(filtered);
  }
);

const initialState = {
  cocktails: [],
  loading: null,
  error: null,
};

export const alcoholicSlice = createSlice({
  name: "alcoholic",
  initialState,
  extraReducers: {
    [fetchByAlcoholic.pending]: (state) => {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchByAlcoholic.fulfilled]: (state, action) => {
      state.loading = HTTP_STATUS.FULFILLED;
      state.cocktails = action.payload;
    },
    [fetchByAlcoholic.rejected]: (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.error.message;
    },
  },
});

export default alcoholicSlice.reducer;
