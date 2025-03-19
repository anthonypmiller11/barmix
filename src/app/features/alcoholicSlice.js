import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const alcoholicSlice = createSlice({
  name: "alcoholic",
  initialState,
  reducers: {
    fetchByAlcoholicFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { fetchByAlcoholicFulfilled } = alcoholicSlice.actions;

export const fetchByAlcoholic = (type) => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const filtered = data[0].filter(cocktail => 
    cocktail.strAlcoholic.toLowerCase() === type.toLowerCase()
  );
  dispatch(fetchByAlcoholicFulfilled(filtered));
};

export default alcoholicSlice.reducer;
