import React from "react";
import "../../components/InfosCompra/InfosContratante.css";
import { useOrcamento } from "../../context/OrcamentoContext";
import { useNavigate } from "react-router-dom";

export default function OrcamentoResumo() {
  const { orcamento, resetarOrcamento } = useOrcamento();
  const navigate = useNavigate();

  const { baseFesta, opcionais, infosContratante } = orcamento;

  const handleConfirmar = () => {
    console.log(JSON.parse(JSON.stringify(orcamento)));
    alert("Orçamento enviado com sucesso!");
    resetarOrcamento();
    navigate("/");
  };

  const renderCampo = (label, valor) => (
    <div key={label}>
      <strong>{label}:</strong> {valor || "-"}
    </div>
  );

  return (
    <div className="infos-container">
      <h1 className="logo">
        ELO <span>DRINKS</span>
      </h1>

      <div className="infos-form">
        <div className="section-title">DADOS DO CONTRATANTE</div>
        <div id="linha-horizontal-infos" />
        <div className="form-grid">
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
        <div className="form-grid">
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

        <div className="form-grid">
          <div>
            <strong>Shots:</strong>
            <ul>
              {Object.entries(opcionais.shots).map(([key, val]) => (
                <li key={key}>
                  {key}: {val}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Extras:</strong>
            <ul>
              {Object.entries(opcionais.extras).map(([key, val]) => (
                <li key={key}>
                  {key}: {val}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Bares Adicionais:</strong>
            <ul>
              {opcionais.baresAdicionais.length > 0 ? (
                opcionais.baresAdicionais.map((bar) => <li key={bar}>{bar}</li>)
              ) : (
                <li>Nenhum</li>
              )}
            </ul>
          </div>
        </div>

        <div className="form-footer" style={{ marginTop: "40px" }}>
          <button type="button" onClick={handleConfirmar}>
            CONFIRMAR ENVIO
          </button>
        </div>
      </div>
    </div>
  );
}
