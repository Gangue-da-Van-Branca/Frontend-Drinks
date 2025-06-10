import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import { OrcamentoProvider } from "./context/OrcamentoContext";
import "react-toastify/dist/ReactToastify.css";
import './style/fonts.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OrcamentoProvider>
      <AppRoutes />
      <ToastContainer />
    </OrcamentoProvider>
  </React.StrictMode>
);
