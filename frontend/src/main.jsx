import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./styles/style1-thai.css";
console.log("🔥 MAIN JSX IS LOADED 🔥");


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

