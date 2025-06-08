import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Cliente/Home/Home";
import Cadastro from "../pages/Cadastro/Cadastro";
import Pacotes from "../pages/Cliente/PacotesPage/Pacotes";
import BaseDrinks from "../pages/Cliente/BaseDrinks/BaseDrinks";
import Opcionais from "../pages/Cliente/Opcionais/Opcionais";
import InfosCompra from "../pages/Cliente/InfosCompra/InfosCompra";
import OrcamentoResumo from "../pages/Cliente/InfosCompra/OrcamentoResumo";
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

        <Route
          path="/basedrinks"
          element={
            <PrivateRoute>
              <BaseDrinks />
            </PrivateRoute>
          }
        />
        <Route
          path="/opcionais"
          element={
            <PrivateRoute>
              <Opcionais />
            </PrivateRoute>
          }
        />
        <Route
          path="/infosContratante"
          element={
            <PrivateRoute>
              <InfosCompra />
            </PrivateRoute>
          }
        />
        <Route
          path="/orcamento-resumo"
          element={
            <PrivateRoute>
              <OrcamentoResumo />
            </PrivateRoute>
          }
        />
        <Route
          path="/meus-pedidos"
          element={
            <PrivateRoute>
              <MeusPedidos />
            </PrivateRoute>
          }
        />

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
