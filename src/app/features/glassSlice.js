import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import { glassTypes } from "../utils/data";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const glassSlice = createSlice({
  name: "glass",
  initialState,
  reducers: {
    fetchByGlassPending(state) {
      state.loading = HTTP_STATUS.PENDING;
      state.error = null;
    },
    fetchByGlassFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    fetchByGlassRejected(state, action) {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.payload;
    },
  },
});

export const {
  fetchByGlassPending,
  fetchByGlassFulfilled,
  fetchByGlassRejected,
} = glassSlice.actions;

export const fetchByGlass = (typeIndex) => async (dispatch) => {
  dispatch(fetchByGlassPending());
  try {
    const response = await fetch("/data/cocktailrecipes.json");
    const cocktails = await response.json();
    const filteredCocktails = cocktails[0].filter(
      (cocktail) => cocktail.strGlass.toLowerCase() === glassTypes[typeIndex].toLowerCase()
    );
    dispatch(fetchByGlassFulfilled(filteredCocktails));
  } catch (error) {
    dispatch(fetchByGlassRejected(error.message));
  }
};

export default glassSlice.reducer;
