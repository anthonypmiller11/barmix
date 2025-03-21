import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showIngredientModal: false,
  showSearchModal: false,
  showMobileMenu: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleIngredientModal: (state, action) => {
      state.showIngredientModal = action.payload ?? !state.showIngredientModal;
    },
    toggleSearchModal: (state, action) => {
      state.showSearchModal = action.payload ?? !state.showSearchModal;
    },
    toggleMobileMenu: (state, action) => {
      state.showMobileMenu = action.payload ?? !state.showMobileMenu;
    },
  },
});

// ✅ Export actions
export const {
  toggleIngredientModal,
  toggleSearchModal,
  toggleMobileMenu,
} = modalSlice.actions;

export default modalSlice.reducer;
