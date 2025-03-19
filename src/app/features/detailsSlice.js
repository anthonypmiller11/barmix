import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktail: {},
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    fetchCocktailDetailsPending(state) {
      state.loading = HTTP_STATUS.PENDING;
      state.error = null;
    },
    fetchCocktailDetailsFulfilled(state, action) {
      state.cocktail = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    fetchCocktailDetailsRejected(state, action) {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCocktailDetailsPending,
  fetchCocktailDetailsFulfilled,
  fetchCocktailDetailsRejected,
} = detailsSlice.actions;

export const fetchCocktailDetails = (id) => async (dispatch) => {
  dispatch(fetchCocktailDetailsPending());
  try {
    const response = await fetch("/data/cocktailrecipes.json");
    const cocktails = await response.json();
    const cocktail = cocktails[0].find((c) => c.idDrink === id); // Assuming first array in JSON
    if (cocktail) {
      dispatch(fetchCocktailDetailsFulfilled(cocktail));
    } else {
      dispatch(fetchCocktailDetailsRejected("Cocktail not found"));
    }
  } catch (error) {
    dispatch(fetchCocktailDetailsRejected(error.message));
  }
};

export default detailsSlice.reducer;
