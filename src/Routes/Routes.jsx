import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Cliente/Home/Home";
import Cadastro from "../pages/Cadastro/Cadastro";
import Dashboard from "../pages/Cliente/Dashboard";
import Pacotes from "../pages/Cliente/PacotesPage/Pacotes";
import BaseDrinks from "../pages/Cliente/BaseDrinks/BaseDrinks";
import Opcionais from "../pages/Cliente/Opcionais/Opcionais";
import InfosCompra from "../pages/Cliente/InfosCompra/InfosCompra";
import OrcamentoResumo from "../pages/Cliente/OrcamentoResumo";
import AdminPage from "../pages/AdminPage/AdminPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pacotes" element={<Pacotes />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/basedrinks" element={<BaseDrinks />} />
        <Route path="/opcionais" element={<Opcionais />} />
        <Route path="/infosContratante" element={<InfosCompra />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orcamento-resumo" element={<OrcamentoResumo />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/administrador" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
