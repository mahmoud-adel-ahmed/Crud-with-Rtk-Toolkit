// import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./services/store.js";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer />
  </Provider>
);
