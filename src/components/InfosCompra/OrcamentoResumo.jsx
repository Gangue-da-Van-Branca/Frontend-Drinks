/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./OrcamentoResumo.css";
import { useOrcamento } from "../../context/OrcamentoContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import sair from "../../assets/icons/Botão X.svg";
import voltar from "../../assets/icons/arrow-white.svg";
import { toast } from "react-toastify";
import "./OrcamentoResumo.css";

export default function OrcamentoResumo() {
  const { orcamento, resetarOrcamento } = useOrcamento();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ loading: false, error: null });
  const { baseFesta, opcionais, infosContratante, dadosOpcionais } = orcamento;

  const calcularPreco = () => {
    const tiposDeFesta = {
      "Casamento": 10000,
      "Evento Corporativo": 7000,
      "Evento de Lançamento": 5000,
      "Coquetel": 4000,
      "Aniversário": 5000,
      "Debutante": 8000,
      "Festa Teen": 3000,
    };

    const tipoFestaSelecionado = baseFesta?.tipoFesta;
    const precoBase = tiposDeFesta[tipoFestaSelecionado] || 8000;

    const safeDadosOpcionais = dadosOpcionais || {
      baresData: [],
      shotsData: [],
      extrasData: [],
    };
    const safeOpcionais = opcionais || {
      baresAdicionais: [],
      shots: {},
      extras: {},
    };

    const totalBares = (safeOpcionais.baresAdicionais || []).reduce(
      (acc, idItem) => {
        const bar = (safeDadosOpcionais.baresData || []).find(
          (b) => b.idItem === idItem
        );
        return acc + (bar ? Number(bar.preco) : 0);
      },
      0
    );

    const totalShots = Object.entries(safeOpcionais.shots || {}).reduce(
      (acc, [idItem, qtd]) => {
        const shot = (safeDadosOpcionais.shotsData || []).find(
          (s) => s.idItem === idItem
        );
        return acc + (shot ? Number(shot.preco) * Number(qtd) : 0);
      },
      0
    );

    const totalExtras = Object.entries(safeOpcionais.extras || {}).reduce(
      (acc, [idItem, qtd]) => {
        const extra = (safeDadosOpcionais.extrasData || []).find(
          (e) => e.idItem === idItem
        );
        return acc + (extra ? Number(extra.preco) * Number(qtd) : 0);
      },
      0
    );

    const numeroConvidados = Number(infosContratante?.convidados) || 0;
    const custoPorPessoa = numeroConvidados * 85;

    return {
      precoBase,
      totalBares,
      totalShots,
      totalExtras,
      custoPorPessoa,
      precoTotal:
        precoBase + totalBares + totalShots + totalExtras + custoPorPessoa,
    };
  };

  const handleConfirmar = async () => {
    setStatus({ loading: true, error: null });
    const {
      precoTotal: precoFinal,
      precoBase,
      totalBares,
      totalShots,
      totalExtras,
      custoPorPessoa,
    } = calcularPreco();

    const mapIdsToNames = (itens, dataSet, dataSetNameForLog) => {
      const result = {};
      if (!dataSet || !Array.isArray(dataSet) || dataSet.length === 0) {
        console.warn(
          "DataSet '${dataSetNameForLog}' para mapIdsToNames está indefinido, não é um array ou está vazio. Os IDs serão usados como nomes."
        );
      }
      for (const [id, qtd] of Object.entries(itens)) {
        const itemData = (dataSet || []).find((d) => d.idItem === id);
        if (!itemData) {
          console.warn(
            ["${dataSetNameForLog}"],
            "Item com ID '${id}' não encontrado no dataSet. Usando ID como nome para o payload."
          );
        }
        const nome = itemData ? itemData.nome : id;
        result[nome] = qtd;
      }
      return result;
    };

    const safeOpcionais = orcamento.opcionais || {
      shots: {},
      extras: {},
      baresAdicionais: [],
    };
    const safeDadosOpcionais = orcamento.dadosOpcionais || {
      shotsData: [],
      extrasData: [],
      baresData: [],
    };

    const mappedShots = mapIdsToNames(
      safeOpcionais.shots,
      safeDadosOpcionais.shotsData,
      "shotsData"
    );
    const mappedExtras = mapIdsToNames(
      safeOpcionais.extras,
      safeDadosOpcionais.extrasData,
      "extrasData"
    );
    const mappedBaresAdicionais = (safeOpcionais.baresAdicionais || []).map(
      (id) => {
        if (
          !safeDadosOpcionais.baresData ||
          !Array.isArray(safeDadosOpcionais.baresData) ||
          safeDadosOpcionais.baresData.length === 0
        ) {
          console.warn(
            "dadosOpcionais.baresData está indefinido, não é um array ou está vazio. O ID será usado como nome."
          );
          return id;
        }
        const bar = safeDadosOpcionais.baresData.find((b) => b.idItem === id);
        return bar ? bar.nome : id;
      }
    );

    const payload = {
      baseFesta: {
        tipoFesta: orcamento.baseFesta?.tipoFesta || "N/A",
        drinksSelecionados: (orcamento.baseFesta?.drinksSelecionados || []).map(
          (drink) => ({
            id: String(drink.idItem || drink.id || ""),
            nome: drink.nome || "Nome não encontrado",
            descricao: drink.descricao || "Descrição não disponível",
          })
        ),
      },
      infosContratante: orcamento.infosContratante || {},
      opcionais: {
        shots: mappedShots,
        extras: mappedExtras,
        baresAdicionais: mappedBaresAdicionais,
      },
      preco: precoFinal,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Orcamento/front-create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const errorText =
          responseData.message ||
          responseData.title ||
          (typeof responseData === "string"
            ? responseData
            : JSON.stringify(responseData.errors || responseData));
        throw new Error(errorText || "Erro ao enviar orçamento");
      }

      toast.success(
        'Orçamento enviado com sucesso! Veja o andamento na aba "Meus pedidos"'
      );
      resetarOrcamento();
      navigate("/");
    } catch (err) {
      toast.error("Erro ao enviar orçamento para API.");
      setStatus({
        loading: false,
        error: err.message || "Falha ao enviar orçamento. Verifique o console.",
      });
    }
  };

  const renderCampo = (label, valor) => (
    <div key={label} className="campo">
      <strong>{label}:</strong> {String(valor ?? "-")}
    </div>
  );

  if (
    !orcamento ||
    !infosContratante ||
    !baseFesta ||
    !opcionais ||
    !dadosOpcionais
  ) {
    return (
      <div id="orcamento-container">
        <h1 id="orcamento-logo">
          ELO <span>DRINKS</span>
        </h1>
        <p>Carregando dados do orçamento ou orçamento inicializando...</p>
      </div>
    );
  }

  const {
    precoBase,
    totalBares,
    totalShots,
    totalExtras,
    custoPorPessoa,
    precoTotal,
  } = calcularPreco();

  return (
    <div id="info-border">
      <div className="infos-container">
        <div id="botoes">
          <button type="submit" onClick={() => navigate("/")}>
            <img src={sair} alt="" />
          </button>
          <button type="submit" onClick={() => navigate("/infosContratante")}>
            <img src={voltar} alt="" />
          </button>
        </div>

        <img src={logo} alt="logo" id="logo" />

        <div id="colunas">
          <div id="enquadramento">
            <div className="infos-form">
              <div className="section-title" id="orc-sec">
                DADOS DO CONTRATANTE
              </div>

              <div id="resumo-form-grid">
                {renderCampo(
                  "Nome",
                  `${infosContratante.nome || ""} ${
                    infosContratante.sobrenome || ""
                  }`.trim()
                )}
                {renderCampo("Telefone", infosContratante.telefone)}
                {renderCampo("Email", infosContratante.email)}
                {renderCampo("Data", infosContratante.data)}
                {renderCampo("Endereço", infosContratante.endereco)}
                {renderCampo("CEP", infosContratante.cep)}
                {renderCampo(
                  "Horário",
                  `${infosContratante.horarioInicio || ""}h - ${
                    infosContratante.horarioFinal || ""
                  }h`.trim()
                )}
                {renderCampo("Convidados", infosContratante.convidados)}
              </div>
            </div>

            <div id="enquadramento">
              <div className="section-title" id="orc-sec">
                BARES ADICIONAIS
              </div>
              <ul>
                {opcionais.baresAdicionais &&
                dadosOpcionais.baresData &&
                opcionais.baresAdicionais.length > 0 ? (
                  opcionais.baresAdicionais.map((barId) => {
                    const barData = dadosOpcionais.baresData.find(
                      (b) => b.idItem === barId
                    );
                    return (
                      <li key={barId}>
                        {barData ? barData.nome : barId} - {"R$ "}
                        {barData ? barData.preco : barId}
                      </li>
                    );
                  })
                ) : (
                  <li>Nenhum</li>
                )}
              </ul>
            </div>
          </div>
          <div id="enquadramento">
            <div className="infos-form">
              <div className="section-title" id="orc-sec">
                BASE DA FESTA
              </div>

              <div className="form-grid">
                {baseFesta &&
                  Object.entries(baseFesta)
                    .slice(1)
                    .map(([key, value]) => {
                      if (
                        key === "drinksSelecionados" &&
                        Array.isArray(value)
                      ) {
                        return (
                          <div key={key} className="campo">
                            <strong>Drinks Selecionados:</strong>
                            <ul>
                              {value.map((drink, index) => (
                                <li key={index}>
                                  {drink.nome || String(drink)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      } else {
                        return (
                          <div key={key} className="campo">
                            <strong>
                              {key === "tipoFesta" ? "Tipo da Festa" : key}:
                            </strong>{" "}
                            {typeof value === "object" && value !== null
                              ? value.nome || JSON.stringify(value)
                              : String(value)}
                          </div>
                        );
                      }
                    })}
              </div>
            </div>
          </div>
          <div id="enquadramento">
            <div className="section-title" id="orc-sec">
              OPCIONAIS
            </div>
            <div>
              <strong>Shots:</strong>
              <ul>
                {opcionais.shots &&
                  dadosOpcionais.shotsData &&
                  Object.entries(opcionais.shots)
                    .filter(([_, val]) => val > 0)
                    .map(([key, val]) => {
                      const shot = dadosOpcionais.shotsData.find(
                        (s) => s.idItem === key
                      );
                      return (
                        <li key={key}>
                          {val}{" "}{shot ? shot.nome : key}
                        </li>
                      );
                    })}
              </ul>
            </div>

            <div>
              <strong>Extras:</strong>
              <ul>
                {opcionais.extras &&
                  dadosOpcionais.extrasData &&
                  Object.entries(opcionais.extras)
                    .filter(([_, val]) => val > 0)
                    .map(([key, val]) => {
                      const extra = dadosOpcionais.extrasData.find(
                        (e) => e.idItem === key
                      );
                      return (
                        <li key={key}>
                          {val}{" "}{extra ? extra.nome : key}
                        </li>
                      );
                    })}
              </ul>
            </div>
          </div>
        </div>
        <div id="orcamento-footer">
          <div id = "orcamento-infosall">
            Custo base = R$ {precoBase.toFixed(2)} <br />
            Convidados = R$ {custoPorPessoa.toFixed(2)} <br />
            Opcionais = R$ {(totalBares + totalShots + totalExtras).toFixed(2)} <br />
            </div>
          <div id="preco-final">
            <strong>Preço final:</strong> R$ {precoTotal.toFixed(2)}
          </div>

          <button
            type="button"
            onClick={handleConfirmar}
            disabled={status.loading}
            id="confirm"
          >
            {status.loading ? "ENVIANDO..." : "CONFIRMAR ENVIO"}
          </button>
        </div>

        {status.error && (
          <div style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
            <strong>Erro:</strong> {status.error}
          </div>
        )}
      </div>
    </div>
  );
}
