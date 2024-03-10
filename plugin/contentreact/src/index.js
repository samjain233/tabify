import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const body = document.querySelector("body");

const app = document.createElement("div");

app.id = "rootsambhav";

if (body) {
  body.prepend(app);
}

const root = ReactDOM.createRoot(document.getElementById("rootsambhav"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
