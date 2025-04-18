// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";              // ← assure-toi d’avoir cette ligne
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
            <App />
    </React.StrictMode>
);