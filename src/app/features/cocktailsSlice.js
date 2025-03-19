import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {
    fetchCocktailsFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    fetchByFirstLetterFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    onLetterClick(state, action) {
      state.cocktails = action.payload;
    },
  },
});

export const { fetchCocktailsFulfilled, fetchByFirstLetterFulfilled, onLetterClick } = cocktailsSlice.actions;

export const fetchCocktails = () => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  dispatch(fetchCocktailsFulfilled(data[0]));
};

export const fetchByFirstLetter = (letter) => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const filtered = data[0].filter(cocktail => 
    cocktail.strDrink.toUpperCase().startsWith(letter)
  );
  dispatch(fetchByFirstLetterFulfilled(filtered));
  dispatch(onLetterClick(filtered));
};

export default cocktailsSlice.reducer;
