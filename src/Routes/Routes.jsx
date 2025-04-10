import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Cliente/Home/Home";
import Personalizar from "../pages/Cliente/Personalizar";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Cliente/Dashboard";
import OrcamentoResumo from "../pages/Cliente/OrcamentoResumo";
import Pacotes from "../pages/Cliente/Pacotes";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/personalizar" element={<Personalizar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orcamento-resumo" element={<OrcamentoResumo />} />
        <Route path="/pacotes" element={<Pacotes />} />
      </Routes>
    </Router>
  );
}
