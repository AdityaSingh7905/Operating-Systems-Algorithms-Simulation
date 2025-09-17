import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SimulationProvider } from "./context/SimulationContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SimulationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SimulationProvider>
  </React.StrictMode>
);
