import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showIngredientModal: false,
  showSearchModal: false,
  showMobileMenu: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openIngredientModal: (state) => {
      state.showIngredientModal = true;
    },
    closeIngredientModal: (state) => {
      state.showIngredientModal = false;
    },
    openSearchModal: (state) => {
      state.showSearchModal = true;
    },
    closeSearchModal: (state) => {
      state.showSearchModal = false;
    },
    openMobileMenu: (state) => {
      state.showMobileMenu = true;
    },
    closeMobileMenu: (state) => {
      state.showMobileMenu = false;
    },
  },
});

export const {
  openIngredientModal,
  closeIngredientModal,
  openSearchModal,
  closeSearchModal,
  openMobileMenu,
  closeMobileMenu,
} = modalSlice.actions;

export default modalSlice.reducer;
