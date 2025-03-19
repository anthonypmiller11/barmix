import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cocktails: [],
  loading: "idle",
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchCocktailsFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = "fulfilled";
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
