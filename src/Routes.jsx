import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Personalizar from "./pages/Personalizar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrcamentoResumo from "./pages/OrcamentoResumo";
import Pacotes from "./pages/Pacotes";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personalizar" element={<Personalizar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orcamento-resumo" element={<OrcamentoResumo />} />
        <Route path="/pacotes" element={<Pacotes />} />
      </Routes>
    </Router>
  );
}
