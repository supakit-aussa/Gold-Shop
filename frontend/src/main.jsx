import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// 🔴 FORCE TEST
import "./styles/style1-thai.css";
console.log("CSS SHOULD BE LOADED");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

