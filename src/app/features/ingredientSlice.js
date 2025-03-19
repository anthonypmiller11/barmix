import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  ingredients: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
  currentIngredient: null,
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    fetchIngredientsPending(state) {
      state.loading = HTTP_STATUS.PENDING;
      state.error = null;
    },
    fetchIngredientsFulfilled(state, action) {
      state.ingredients = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
    fetchIngredientsRejected(state, action) {
      state.loading = HTTP_STATUS.REJECTED;
      state.error = action.payload;
    },
    setCurrentIngredient(state, action) {
      state.currentIngredient = action.payload;
    },
  },
});

export const {
  fetchIngredientsPending,
  fetchIngredientsFulfilled,
  fetchIngredientsRejected,
  setCurrentIngredient,
} = ingredientSlice.actions;

export const fetchIngredients = () => async (dispatch) => {
  dispatch(fetchIngredientsPending());
  try {
    const response = await fetch("/data/cocktailrecipes.json");
    const cocktails = await response.json();
    const ingredientsSet = new Set();
    cocktails[0].forEach((cocktail) => {
      for (let i = 1; i <= 8; i++) {
        if (cocktail[`strIngredient${i}`]) {
          ingredientsSet.add(cocktail[`strIngredient${i}`].trim());
        }
      }
    });
    const ingredients = Array.from(ingredientsSet).map((name) => ({
      strIngredient1: name,
      imageSmall: `/images/ingredients/${name.replace(/\s+/g, "_")}-small.png`,
      imageMedium: `/images/ingredients/${name.replace(/\s+/g, "_")}-medium.png`,
      image: `/images/ingredients/${name.replace(/\s+/g, "_")}.png`,
    }));
    dispatch(fetchIngredientsFulfilled(ingredients));
  } catch (error) {
    dispatch(fetchIngredientsRejected(error.message));
  }
};

export default ingredientSlice.reducer;
