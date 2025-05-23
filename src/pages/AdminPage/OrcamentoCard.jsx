import React from "react";

export default function OrcamentoCard({ orcamento, index, onAprovar, onRejeitar }) {
  return (
    <div className="orcamento-card">
      <h3>Orçamento #{index + 1}</h3>
      <p><strong>Data:</strong> {orcamento.infosContratante.data}</p>
      <p><strong>Horário:</strong> {orcamento.infosContratante.horarioInicio} - {orcamento.infosContratante.horarioFinal}</p>
      <p><strong>Convidados:</strong> {orcamento.infosContratante.convidados}</p>
      <p><strong>Drinks:</strong> {Object.keys(orcamento.baseFesta.drinks).join(", ")}</p>
      <p><strong>Bares:</strong> {orcamento.opcionais.baresAdicionais.join(", ") || "Nenhum"}</p>
      <p><strong>Opcionais:</strong> {Object.keys(orcamento.opcionais.extras).join(", ")}</p>
      <p><strong>Valor Final:</strong> R$ {orcamento.valorFinal}</p>
      <div className="botoes-acoes">
        <button onClick={() => onAprovar(orcamento)}>✅ Aprovar</button>
        <button onClick={() => onRejeitar(orcamento)}>❌ Rejeitar</button>
      </div>
    </div>
  );
}
