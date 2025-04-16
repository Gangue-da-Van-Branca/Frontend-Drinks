import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Cliente/Home/Home";
import Personalizar from "../pages/Cliente/Personalizar";
import Cadastro from "../pages/Cadastro/Cadastro";
import Dashboard from "../pages/Cliente/Dashboard";
import OrcamentoResumo from "../pages/Cliente/OrcamentoResumo";
import Pacotes from "../pages/Cliente/Pacotes";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/personalizar" element={<Personalizar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orcamento-resumo" element={<OrcamentoResumo />} />
        <Route path="/pacotes" element={<Pacotes />} />
      </Routes>
    </Router>
  );
}
