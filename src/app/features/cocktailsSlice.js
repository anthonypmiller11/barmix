import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cocktails: [],
  loading: "idle",
  error: null,
};

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {
    fetchCocktailsFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = "fulfilled";
    },
  },
});

export const { fetchCocktailsFulfilled } = cocktailsSlice.actions;

export const fetchCocktails = () => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  dispatch(fetchCocktailsFulfilled(data[0]));
};

export default cocktailsSlice.reducer;
