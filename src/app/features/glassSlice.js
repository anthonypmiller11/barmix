import { createSlice } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../utils/constants";

const initialState = {
  cocktails: [],
  loading: HTTP_STATUS.IDLE,
  error: null,
};

const glassSlice = createSlice({
  name: "glass",
  initialState,
  reducers: {
    fetchByGlassFulfilled(state, action) {
      state.cocktails = action.payload;
      state.loading = HTTP_STATUS.FULFILLED;
    },
  },
});

export const { fetchByGlassFulfilled } = glassSlice.actions;

export const fetchByGlass = (type) => async (dispatch) => {
  const response = await fetch("/data/cocktailrecipes.json");
  const data = await response.json();
  const filtered = data[0].filter(cocktail => 
    cocktail.strGlass.toLowerCase() === type.toLowerCase()
  );
  dispatch(fetchByGlassFulfilled(filtered));
};

export default glassSlice.reducer;
