import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

// 1️⃣ Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

// 2️⃣ Initialize AOS
AOS.init({
  duration: 1000, // animation duration in ms
  once: true,     // animate only once
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
