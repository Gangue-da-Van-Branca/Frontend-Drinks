import React from "react";
import "./OrcamentoResumo.css";
import { useOrcamento } from "../../context/OrcamentoContext";
import { useNavigate } from "react-router-dom";

export default function OrcamentoResumo() {
  const { orcamento, resetarOrcamento } = useOrcamento();
  const navigate = useNavigate();

  const { baseFesta, opcionais, infosContratante, dadosOpcionais } = orcamento;

  const calcularPreco = () => {
    let precoBase = 500;

    const totalBares = (opcionais.baresAdicionais || []).reduce((acc, idItem) => {
      const bar = dadosOpcionais.baresData.find((b) => b.idItem === idItem);
      return acc + (bar ? bar.preco : 0);
    }, 0);

    const totalShots = Object.entries(opcionais.shots || {}).reduce((acc, [idItem, qtd]) => {
      const shot = dadosOpcionais.shotsData.find((s) => s.idItem === idItem);
      return acc + (shot ? shot.preco * qtd : 0);
    }, 0);

    const totalExtras = Object.entries(opcionais.extras || {}).reduce((acc, [idItem, qtd]) => {
      const extra = dadosOpcionais.extrasData.find((e) => e.idItem === idItem);
      return acc + (extra ? extra.preco * qtd : 0);
    }, 0);

    return precoBase + totalBares + totalShots + totalExtras;
  };

  const handleConfirmar = () => {
    const precoFinal = calcularPreco();

    const orcamentoFinal = {
      ...orcamento,
      preco: precoFinal,
    };

    console.log("Enviando orçamento:", orcamentoFinal);

    fetch("http://localhost:8080/Orcamento/front-create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orcamentoFinal),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("Resposta da API:", res.status, data);

        if (!res.ok) throw new Error("Erro ao enviar orçamento");

        alert("Orçamento enviado com sucesso!");
        resetarOrcamento();
        navigate("/");
      })
      .catch((err) => {
        console.error("Erro:", err);
        alert("Falha ao enviar orçamento.");
      });
  };

  const renderCampo = (label, valor) => (
    <div key={label} className="campo">
      <strong>{label}:</strong> {valor || "-"}
    </div>
  );

  return (
    <div id="orcamento-container">
      <h1 id="orcamento-logo">
        ELO <span>DRINKS</span>
      </h1>

      <div id="orcamento-form">
        <div className="section-title">DADOS DO CONTRATANTE</div>
        <div id="linha-horizontal-infos" />
        <div id="dados-contratante">
          {renderCampo("Nome", infosContratante.nome)}
          {renderCampo("Sobrenome", infosContratante.sobrenome)}
          {renderCampo("Telefone", infosContratante.telefone)}
          {renderCampo("Email", infosContratante.email)}
          {renderCampo("Data", infosContratante.data)}
          {renderCampo("Endereço", infosContratante.endereco)}
          {renderCampo("CEP", infosContratante.cep)}
          {renderCampo("Horário Início", infosContratante.horarioInicio)}
          {renderCampo("Horário Final", infosContratante.horarioFinal)}
          {renderCampo("Convidados", infosContratante.convidados)}
        </div>

        <div className="section-title">BASE DA FESTA</div>
        <div id="linha-horizontal-infos" />
        <div id="base-festa">
          {Object.entries(baseFesta).map(([key, value]) => {
            let valorFormatado;

            if (Array.isArray(value)) {
              valorFormatado = value.map((v) => v.nome || v).join(", ");
            } else if (typeof value === "object" && value !== null) {
              valorFormatado = value.nome || JSON.stringify(value);
            } else {
              valorFormatado = value;
            }

            return renderCampo(key, valorFormatado);
          })}
        </div>

        <div className="section-title">OPCIONAIS</div>
        <div id="linha-horizontal-infos" />

        <div id="opcionais">
          <div id="opcionais-shots">
            <strong>Shots:</strong>
            <ul>
              {Object.entries(opcionais.shots).map(([key, val]) => (
                <li key={key}>
                  {key}: {val}
                </li>
              ))}
            </ul>
          </div>

          <div id="opcionais-extras">
            <strong>Extras:</strong>
            <ul>
              {Object.entries(opcionais.extras).map(([key, val]) => (
                <li key={key}>
                  {key}: {val}
                </li>
              ))}
            </ul>
          </div>

          <div id="opcionais-bares">
            <strong>Bares Adicionais:</strong>
            <ul>
              {opcionais.baresAdicionais.length > 0 ? (
                opcionais.baresAdicionais.map((bar) => <li key={bar}>{bar}</li>)
              ) : (
                <li>Nenhum</li>
              )}
            </ul>
          </div>

          <div id="preco-final">
            <strong>Preço final:</strong> R$ {calcularPreco() || "0,00"}
          </div>
        </div>

        <div id="orcamento-footer">
          <button type="button" onClick={handleConfirmar}>
            CONFIRMAR ENVIO
          </button>
        </div>
      </div>
    </div>
  );
}
