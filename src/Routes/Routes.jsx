import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Cliente/Home/Home";
import Cadastro from "../pages/Cadastro/Cadastro";
import Pacotes from "../pages/Cliente/PacotesPage/Pacotes";
import BaseDrinks from "../pages/Cliente/BaseDrinks/BaseDrinks";
import Opcionais from "../pages/Cliente/Opcionais/Opcionais";
import InfosCompra from "../pages/Cliente/InfosCompra/InfosCompra";
import OrcamentoResumo from "../pages/Cliente/OrcamentoResumo";
import AdminPage from "../pages/AdminPage/AdminPage";
import MeusPedidos from "../pages/Cliente/MeusPedidos/MeusPedidos";
import PrivateRoute from "./PrivateRoute";

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
        <Route path="/orcamento-resumo" element={<OrcamentoResumo />} />
        <Route path="/meus-pedidos" element={<MeusPedidos />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rota protegida */}
        <Route
          path="/administrador"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
