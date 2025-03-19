import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktail: null,
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    fetchCocktailDetailsFulfilled(state, action) {
      state.cocktail = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { fetchCocktailDetailsFulfilled } = detailsSlice.actions;

export const fetchCocktailDetails = (id) => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const cocktail = data[0].find(c => c.idDrink === id);
  dispatch(fetchCocktailDetailsFulfilled(cocktail));
};

export default detailsSlice.reducer;
