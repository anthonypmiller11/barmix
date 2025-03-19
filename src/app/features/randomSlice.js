import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktail: null,
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const randomSlice = createSlice({
  name: "random",
  initialState,
  reducers: {
    fetchRandomFulfilled(state, action) {
      state.cocktail = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { fetchRandomFulfilled } = randomSlice.actions;

export const fetchRandomDrink = () => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const randomCocktail = data[0][Math.floor(Math.random() * data[0].length)];
  dispatch(fetchRandomFulfilled(randomCocktail));
};

export default randomSlice.reducer;
