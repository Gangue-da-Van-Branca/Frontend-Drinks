import React, { useState } from "react";
import "./DashboardOrcamento.css";

export default function DashboardOrcamentos() {
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
        <div key={index} className="orcamento-card">
          <h3>Orçamento #{index + 1}</h3>
          <p><strong>Data:</strong> {orcamento.infosContratante.data}</p>
          <p><strong>Horário:</strong> {orcamento.infosContratante.horarioInicio} - {orcamento.infosContratante.horarioFinal}</p>
          <p><strong>Convidados:</strong> {orcamento.infosContratante.convidados}</p>

          <p><strong>Drinks:</strong> {Object.keys(orcamento.baseFesta.drinks).join(", ")}</p>
          <p><strong>Bares:</strong> {orcamento.opcionais.baresAdicionais.join(", ") || "Nenhum"}</p>
          <p><strong>Opcionais:</strong> {Object.keys(orcamento.opcionais.extras).join(", ")}</p>

          <p><strong>Valor Final:</strong> R$ {orcamento.valorFinal}</p>

          <div className="botoes-acoes">
            <button onClick={() => handleAprovar(orcamento)}>✅ Aprovar</button>
            <button onClick={() => handleRejeitar(orcamento)}>❌ Rejeitar</button>
          </div>
        </div>
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
