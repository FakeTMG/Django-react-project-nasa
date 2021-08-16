import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import store from "./redux/store";
import { Provider } from "react-redux";
axios.defaults.baseURL = "http://127.0.0.1:8000/";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
