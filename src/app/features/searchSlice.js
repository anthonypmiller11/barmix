import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchCocktailsFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { searchCocktailsFulfilled } = searchSlice.actions;

export const searchCocktails = (query) => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const filtered = data[0].filter(cocktail =>
    cocktail.strDrink.toLowerCase().includes(query.toLowerCase())
  );
  dispatch(searchCocktailsFulfilled(filtered));
};

export default searchSlice.reducer;
