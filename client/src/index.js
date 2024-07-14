import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS

const root = createRoot(document.getElementById("root")); // Use createRoot directly
root.render(
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
      draggablePercent={40}
      style={{
        zIndex: 9999,
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
      }}
      progressStyle={{ background: "#007bff", opacity: "0.7" }}
    />
    <App />
  </>
);

reportWebVitals();
