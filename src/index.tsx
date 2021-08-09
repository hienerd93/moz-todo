import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/index.scss";
import App from "./pages/App";
import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
