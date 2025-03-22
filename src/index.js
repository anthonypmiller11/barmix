import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store"; // Adjusted path
import App from "./App";
import "./index.css";
import axios from "axios";

let persistor = persistStore(store);

const fetchData = async () => {
  const source = axios.CancelToken.source();
  const response = await axios.get("../../data/ingredients.json", { // Adjusted path
    cancelToken: source.token,
  });
  return response.data;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
