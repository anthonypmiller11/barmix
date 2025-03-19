import { createSlice } from "@reduxjs/toolkit";

const aboutIngredientSlice = createSlice({
  name: "aboutIngredient",
  initialState: { ingredient: null, loading: "idle" },
  reducers: {
    setIngredient(state, action) {
      state.ingredient = action.payload;
      state.loading = "fulfilled";
    },
  },
});

export const { setIngredient } = aboutIngredientSlice.actions;

export default aboutIngredientSlice.reducer;
