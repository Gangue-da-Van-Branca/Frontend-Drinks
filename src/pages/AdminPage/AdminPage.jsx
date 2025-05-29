import React, { useState } from "react";
import GerenciarItens from "./GerenciarItens";
import DashboardOrcamentos from "./DashboardOrcamentos";
import "./AdminPage.css";

export default function AdminPage() {
  const [secao, setSecao] = useState("gerenciar");

  return (
    <div className="admin-container">
      <h1>Painel Administrativo - ELO DRINKS</h1>

      <div className="admin-nav">
        <button 
          className={secao === "gerenciar" ? "ativo" : ""} 
          onClick={() => setSecao("gerenciar")}
        >
          Gerenciar Itens
        </button>
        <button 
          className={secao === "orcamentos" ? "ativo" : ""} 
          onClick={() => setSecao("orcamentos")}
        >
          Dashboard Orçamentos
        </button>
      </div>

      <div className="admin-content">
        {secao === "gerenciar" && <GerenciarItens />}
        {secao === "orcamentos" && <DashboardOrcamentos />}
      </div>
    </div>
  );
}
