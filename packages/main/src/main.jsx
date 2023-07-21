import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "uno.css";
import "@unocss/reset/tailwind-compat.css";
import microApp from "@micro-zoe/micro-app";

microApp.start();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
