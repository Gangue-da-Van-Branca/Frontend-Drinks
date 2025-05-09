import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes/Routes";
import { OrcamentoProvider } from "./context/OrcamentoContext";
import './style/fonts.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OrcamentoProvider>
      <AppRoutes />
    </OrcamentoProvider>
  </React.StrictMode>
);
