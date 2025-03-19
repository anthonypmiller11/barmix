import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import { categoryTypes } from "../utils/data";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchByCategoryPending(state) {
      state.loading = HTTP_STATUS.PENDING;
      state.error = null;
    },
    fetchByCategoryFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    fetchByCategoryRejected(state, action) {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.payload;
    },
  },
});

export const {
  fetchByCategoryPending,
  fetchByCategoryFulfilled,
  fetchByCategoryRejected,
} = categorySlice.actions;

export const fetchByCategory = (typeIndex) => async (dispatch) => {
  dispatch(fetchByCategoryPending());
  try {
    const response = await fetch("/data/cocktailrecipes.json");
    const cocktails = await response.json();
    const filteredCocktails = cocktails[0].filter(
      (cocktail) => cocktail.strCategory.toLowerCase() === categoryTypes[typeIndex].toLowerCase()
    );
    dispatch(fetchByCategoryFulfilled(filteredCocktails));
  } catch (error) {
    dispatch(fetchByCategoryRejected(error.message));
  }
};

export default categorySlice.reducer;
