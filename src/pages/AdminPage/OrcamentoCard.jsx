import React from "react";
import "./DashboardOrcamento.css";

export default function OrcamentoCard({
  orcamento,
  onAprovar,
  onRejeitar,
}) {
  const { infosContratante, baseFesta, opcionais, pedido } = orcamento;

  return (
    <div id="orcamento-card">
      <h3>
        Orçamento {baseFesta.tipoFesta} - {infosContratante.nome}{" "}
        {infosContratante.sobrenome}
      </h3>
      <p>
        <strong>Nome:</strong> {infosContratante.nome}{" "}
        {infosContratante.sobrenome}
      </p>
      <p>
        <strong>Data:</strong> {infosContratante.data}
      </p>
      <p>
        <strong>Horário:</strong> {infosContratante.horarioInicio} -{" "}
        {infosContratante.horarioFinal}
      </p>
      <p>
        <strong>Convidados:</strong> {infosContratante.convidados}
      </p>
      <p>
        <strong>Drinks:</strong>{" "}
        {baseFesta.drinksSelecionados.map((d) => d.nome).join(", ")}
      </p>
      <p>
        <strong>Bares adicionais:</strong>{" "}
        {opcionais.baresAdicionais?.join(", ") || "Nenhum"}
      </p>
      <p>
        <strong>Opcionais extras:</strong>{" "}
        {Object.keys(opcionais.extras).join(", ")}
      </p>
      <p>
        <strong>Shots:</strong> {Object.keys(opcionais.shots).join(", ")}
      </p>
      <p>
        <strong>Status Pedido:</strong> {pedido?.status ?? "Sem pedido"}
      </p>
      <p>
        <strong>Total Pedido:</strong> R$ {pedido?.total?.toFixed?.(2) ?? "N/A"}
      </p>

      <div id="botoes-acoes">
        {pedido?.status === "Pendente" ? (
          <>
            <button onClick={() => onAprovar(orcamento)}>✅ Aprovar</button>
            <button onClick={() => onRejeitar(orcamento)}>❌ Cancelar</button>
          </>
        ) : (
          <p>Pedido já resolvido ({pedido?.status})</p>
        )}
      </div>
    </div>
  );
}
