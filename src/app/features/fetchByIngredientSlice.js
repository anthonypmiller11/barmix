import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";
import { organizeIngredients } from "../utils/helpers";

const initialState = {
  ingredients: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    fetchIngredientsFulfilled(state, action) {
      state.ingredients = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { fetchIngredientsFulfilled } = ingredientSlice.actions;

export const fetchIngredients = () => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const ingredients = new Set();
  data[0].forEach(cocktail => {
    for (let i = 1; i <= 8; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.add(ingredient.trim());
      }
    }
  });
  const ingredientList = Array.from(ingredients);
  const organized = organizeIngredients(ingredientList);
  dispatch(fetchIngredientsFulfilled(organized));
};

export default ingredientSlice.reducer;
