import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />  {/* Route pour About */}
        <Route path="/contact" element={<Contact />} />  {/* Route pour Contact */}
        <Route path="/projects" element={<Projects />} />  {/* Route pour Projects */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
