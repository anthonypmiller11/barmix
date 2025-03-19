import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const fetchByIngredientSlice = createSlice({
  name: "fetchByIngredient",
  initialState,
  reducers: {
    fetchByIngredientPending(state) {
      state.loading = HTTP_STATUS.PENDING;
      state.error = null;
    },
    fetchByIngredientFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    fetchByIngredientRejected(state, action) {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.payload;
    },
  },
});

export const {
  fetchByIngredientPending,
  fetchByIngredientFulfilled,
  fetchByIngredientRejected,
} = fetchByIngredientSlice.actions;

export const fetchByIngredient = (ingredient) => async (dispatch) => {
  dispatch(fetchByIngredientPending());
  try {
    const response = await fetch("/data/cocktailrecipes.json");
    const cocktails = await response.json();
    const filteredCocktails = cocktails[0].filter((cocktail) => {
      for (let i = 1; i <= 8; i++) {
        if (
          cocktail[`strIngredient${i}`] &&
          cocktail[`strIngredient${i}`].toLowerCase() === ingredient.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    });
    dispatch(fetchByIngredientFulfilled(filteredCocktails));
  } catch (error) {
    dispatch(fetchByIngredientRejected(error.message));
  }
};

export default fetchByIngredientSlice.reducer;
