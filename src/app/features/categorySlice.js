import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchByCategoryFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { fetchByCategoryFulfilled } = categorySlice.actions;

export const fetchByCategory = (type) => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const filtered = data[0].filter(cocktail => 
    cocktail.strCategory.toLowerCase() === type.toLowerCase()
  );
  dispatch(fetchByCategoryFulfilled(filtered));
};

export default categorySlice.reducer;
