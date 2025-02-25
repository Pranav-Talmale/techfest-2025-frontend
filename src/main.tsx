import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "@/components/Footer/Footer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/technovate-2025/">
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
