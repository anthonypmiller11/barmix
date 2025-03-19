import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cocktail: null,
  loading: "idle",
  error: null,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    fetchCocktailDetailsFulfilled(state, action) {
      state.cocktail = action.payload;
      state.loading = "fulfilled";
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
