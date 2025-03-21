import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cocktailsReducer from "./features/cocktailsSlice";
import randomReducer from "./features/randomSlice";
import detailsReducer from "./features/detailsSlice";
import youtubeReducer from "./features/youtubeSlice";
import favoriteReducer from "./features/favoriteSlice";
import popularReducer from "./features/popularSlice"; // Hypothetical
// ... other reducers

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorite"], // Only persist the favorite slice
};

const rootReducer = combineReducers({
  cocktails: cocktailsReducer,
  random: randomReducer,
  details: detailsReducer,
  youtube: youtubeReducer,
  favorite: favoriteReducer,
  popular: popularReducer,
  // ... other reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

// Clear the persisted state on app load
persistor.purge().then(() => {
  console.log("Persisted state cleared");
});
