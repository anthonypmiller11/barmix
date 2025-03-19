import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import { alcoholicTypes } from "../utils/data";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const alcoholicSlice = createSlice({
  name: "alcoholic",
  initialState,
  reducers: {
    fetchByAlcoholicPending(state) {
      state.loading = HTTP_STATUS.PENDING;
      state.error = null;
    },
    fetchByAlcoholicFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    fetchByAlcoholicRejected(state, action) {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.payload;
    },
  },
});

export const {
  fetchByAlcoholicPending,
  fetchByAlcoholicFulfilled,
  fetchByAlcoholicRejected,
} = alcoholicSlice.actions;

export const fetchByAlcoholic = (typeIndex) => async (dispatch) => {
  dispatch(fetchByAlcoholicPending());
  try {
    const response = await fetch("/data/cocktailrecipes.json");
    const cocktails = await response.json();
    const filteredCocktails = cocktails[0].filter(
      (cocktail) => cocktail.strAlcoholic.toLowerCase() === alcoholicTypes[typeIndex].toLowerCase()
    );
    dispatch(fetchByAlcoholicFulfilled(filteredCocktails));
  } catch (error) {
    dispatch(fetchByAlcoholicRejected(error.message));
  }
};

export default alcoholicSlice.reducer;
