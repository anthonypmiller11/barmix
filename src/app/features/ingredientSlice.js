import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import { containsIngredient } from "../utils/helpers";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const fetchByIngredientSlice = createSlice({
  name: "fetchByIngredient",
  initialState,
  reducers: {
    fetchByIngredientFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { fetchByIngredientFulfilled } = fetchByIngredientSlice.actions;

export const fetchByIngredient = (ingredient) => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const filtered = data[0].filter(cocktail => 
    containsIngredient(cocktail, [ingredient])
  );
  dispatch(fetchByIngredientFulfilled(filtered));
};

export default fetchByIngredientSlice.reducer;
