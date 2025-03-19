import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizeCocktailList } from "../utils/helpers";

const initialState = {
  cocktails: [],
  loading: "idle",
  error: null,
};

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {
    onLetterClick(state, action) {
      state.cocktails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktails = action.payload;
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchByFirstLetter.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchByFirstLetter.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cocktails = action.payload;
      })
      .addCase(fetchByFirstLetter.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchCocktails",
  async () => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    return organizeCocktailList(data[0]);
  }
);

export const fetchByFirstLetter = createAsyncThunk(
  "cocktails/fetchByFirstLetter",
  async (letter) => {
    const response = await fetch("/data/cocktailrecipes.json");
    const data = await response.json();
    const filtered = data[0].filter(cocktail =>
      cocktail.strDrink.toUpperCase().startsWith(letter)
    );
    return organizeCocktailList(filtered);
  }
);

export const { onLetterClick } = cocktailsSlice.actions;
export default cocktailsSlice.reducer;
