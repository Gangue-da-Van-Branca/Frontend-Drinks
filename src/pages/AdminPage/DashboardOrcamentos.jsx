import React, { useState } from "react";
import OrcamentoCard from "./OrcamentoCard.jsx";
import "./DashboardOrcamento.css";

export default function DashboardOrcamentos() {
  // eslint-disable-next-line no-unused-vars
  const [orcamentos, setOrcamentos] = useState(mockOrcamentos);

  const handleAprovar = (orcamento) => {
    alert(`Orçamento para o dia ${orcamento.infosContratante.data} aprovado!`);
  };

  const handleRejeitar = (orcamento) => {
    alert(`Orçamento para o dia ${orcamento.infosContratante.data} rejeitado!`);
  };

  return (
    <div className="dashboard-orcamentos">
      <h2>Orçamentos Recebidos</h2>
      {orcamentos.map((orcamento, index) => (
        <OrcamentoCard 
          key={index}
          orcamento={orcamento}
          index={index}
          onAprovar={handleAprovar}
          onRejeitar={handleRejeitar}
        />
      ))}
    </div>
  );
}

const mockOrcamentos = [
  {
    infosContratante: {
      data: "2025-06-15",
      horarioInicio: "18:00",
      horarioFinal: "23:00",
      convidados: 120
    },
    baseFesta: {
      drinks: {
        "Caipirinha": true,
        "Gin Tônica": true
      }
    },
    opcionais: {
      baresAdicionais: ["Bar de Caipirinhas"],
      extras: {
        "Decoração Premium": true,
        "DJ": true
      }
    },
    valorFinal: "4500,00"
  },
  {
    infosContratante: {
      data: "2025-07-10",
      horarioInicio: "20:00",
      horarioFinal: "02:00",
      convidados: 80
    },
    baseFesta: {
      drinks: {
        "Mojito": true,
        "Margarita": true
      }
    },
    opcionais: {
      baresAdicionais: [],
      extras: {
        "Iluminação Especial": true
      }
    },
    valorFinal: "3200,00"
  }
];
