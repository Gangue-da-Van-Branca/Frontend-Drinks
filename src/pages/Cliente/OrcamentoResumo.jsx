/* eslint-disable no-unused-vars */
import React, { useState } from "react"; // Adicionado useState que estava faltando na sua última versão
import "./OrcamentoResumo.css";
import { useOrcamento } from "../../context/OrcamentoContext";
import { useNavigate } from "react-router-dom";

// --- ATENÇÃO: VERIFIQUE E AJUSTE A URL DA SUA API ABAIXO ---
// Certifique-se de que esta é a porta onde sua API .NET está realmente rodando e acessível.
// No seu último log de erro bem-sucedido (404 Not Found), a porta era 5252.
// No código do frontend que você colou, está 8080. Verifique qual é a correta.
const API_BASE_URL = "http://localhost:8080"; // Verifique esta porta!

export default function OrcamentoResumo() {
  const { orcamento, resetarOrcamento } = useOrcamento();
  const navigate = useNavigate();

  // Adicionando o estado para loading e erro, caso não esteja no seu código original.
  const [status, setStatus] = useState({ loading: false, error: null });

  // Esses são os dados que vêm do seu contexto
  // É crucial que 'dadosOpcionais' esteja corretamente populado no seu OrcamentoContext
  // com 'shotsData', 'extrasData', e 'baresData' como arrays de objetos
  // e cada objeto contendo pelo menos 'idItem' e 'nome'.
  const { baseFesta, opcionais, infosContratante, dadosOpcionais } = orcamento;

  const calcularPreco = () => {
    let precoBase = 8000;

    // Garante que dadosOpcionais e suas propriedades existam antes de tentar usá-los
    const safeDadosOpcionais = dadosOpcionais || { baresData: [], shotsData: [], extrasData: []};
    const safeOpcionais = opcionais || { baresAdicionais: [], shots: {}, extras: {} };

    const totalBares = (safeOpcionais.baresAdicionais || []).reduce(
      (acc, idItem) => {
        const bar = (safeDadosOpcionais.baresData || []).find((b) => b.idItem === idItem);
        return acc + (bar ? Number(bar.preco) : 0);
      },
      0
    );

    const totalShots = Object.entries(safeOpcionais.shots || {}).reduce(
      (acc, [idItem, qtd]) => {
        const shot = (safeDadosOpcionais.shotsData || []).find((s) => s.idItem === idItem);
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

    return precoBase + totalBares + totalShots + totalExtras + custoPorPessoa;
  };

  const handleConfirmar = async () => { // Adicionado async aqui
    setStatus({ loading: true, error: null }); // Adicionado para feedback de UI

    const precoFinal = calcularPreco();

    // --- LOGS PARA DEPURAÇÃO ---
    console.log("ESTADO INICIAL DO ORCAMENTO (do contexto):", JSON.stringify(orcamento, null, 2));
    console.log("Conteúdo de orcamento.dadosOpcionais:", JSON.stringify(orcamento.dadosOpcionais, null, 2));
    console.log("Conteúdo de orcamento.opcionais (ANTES do mapeamento):", JSON.stringify(orcamento.opcionais, null, 2));
    // --- FIM DOS LOGS PARA DEPURAÇÃO ---

    const mapIdsToNames = (itens, dataSet, dataSetNameForLog) => {
      const result = {};
      if (!dataSet || !Array.isArray(dataSet) || dataSet.length === 0) {
          console.warn("DataSet '${dataSetNameForLog}' para mapIdsToNames está indefinido, não é um array ou está vazio. Os IDs serão usados como nomes.");
      }
      for (const [id, qtd] of Object.entries(itens)) {
        const itemData = (dataSet || []).find((d) => d.idItem === id); // Adicionado (dataSet || []) para segurança
        if (!itemData) {
          console.warn(['${dataSetNameForLog}'],"Item com ID '${id}' não encontrado no dataSet. Usando ID como nome para o payload.");
        }
        const nome = itemData ? itemData.nome : id; // Se não encontrar, usa o ID como nome
        result[nome] = qtd;
      }
      return result;
    };

    // Garante que 'opcionais' e 'dadosOpcionais' e suas sub-propriedades existam e sejam arrays/objetos antes de usá-los
    const safeOpcionais = orcamento.opcionais || { shots: {}, extras: {}, baresAdicionais: [] };
    const safeDadosOpcionais = orcamento.dadosOpcionais || { shotsData: [], extrasData: [], baresData: [] };

    const mappedShots = mapIdsToNames(safeOpcionais.shots, safeDadosOpcionais.shotsData, "shotsData");
    const mappedExtras = mapIdsToNames(safeOpcionais.extras, safeDadosOpcionais.extrasData, "extrasData");
    const mappedBaresAdicionais = (safeOpcionais.baresAdicionais || []).map((id) => {
      if (!safeDadosOpcionais.baresData || !Array.isArray(safeDadosOpcionais.baresData) || safeDadosOpcionais.baresData.length === 0) {
          console.warn("dadosOpcionais.baresData está indefinido, não é um array ou está vazio. O ID será usado como nome.");
          return id;
      }
      const bar = safeDadosOpcionais.baresData.find((b) => b.idItem === id);
      if (!bar) {
        console.warn([safeDadosOpcionais.baresData], "Bar com ID '${id}' não encontrado em dadosOpcionais.baresData. Usando ID como nome para o payload.");
      }
      return bar ? bar.nome : id;
    });

    const payload = {
      baseFesta: {
        tipoFesta: orcamento.baseFesta?.tipoFesta || "N/A",
        drinksSelecionados: (orcamento.baseFesta?.drinksSelecionados || []).map((drink) => ({
          // Backend espera 'id' como string, 'nome' e 'descricao'.
          // O backend foi ajustado para buscar por 'drink.Nome'.
          id: String(drink.idItem || drink.id || ""), // Garante que 'id' seja string e tenta pegar de idItem ou id
          nome: drink.nome || "Nome não encontrado",
          descricao: drink.descricao || "Descrição não disponível",
        })),
      },
      infosContratante: orcamento.infosContratante || {},
      opcionais: {
        shots: mappedShots,
        extras: mappedExtras,
        baresAdicionais: mappedBaresAdicionais,
      },
      preco: precoFinal,
    };

    console.log("Enviando PAYLOAD FINAL para API:", JSON.stringify(payload, null, 2));

    try { // Adicionado try/catch para o fetch
      const response = await fetch("http://localhost:8080/Orcamento/front-create", { // Adicionado API_BASE_URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json(); // Tenta ler como JSON mesmo se !res.ok para pegar erros do backend
      console.log("Resposta da API:", response.status, responseData);

      if (!response.ok) {
        // Tenta extrair uma mensagem de erro mais útil do corpo da resposta
        const errorText = responseData.message || responseData.title || (typeof responseData === 'string' ? responseData : JSON.stringify(responseData.errors || responseData));
        throw new Error(errorText || "Erro ao enviar orçamento: ${response.status}");
      }

      alert("Orçamento enviado com sucesso! ID Orçamento: ${responseData.idOrcamento}, ID Pedido: ${responseData.idPedido}");
      resetarOrcamento();
      navigate("/");

    } catch (err) {
      console.error("Erro ao enviar orçamento para API:", err);
      setStatus({ loading: false, error: err.message || "Falha ao enviar orçamento. Verifique o console."}); // Atualiza o estado de erro
      // Removido o alert daqui para mostrar o erro no componente
    }
  };

  const renderCampo = (label, valor) => (
    <div key={label} className="campo">
      <strong>{label}:</strong> {String(valor ?? "-")} {/* Usa String() e coalescência nula */}
    </div>
  );

  // Validação para garantir que os dados do contexto existem antes de tentar renderizar
  if (!orcamento || !infosContratante || !baseFesta || !opcionais || !dadosOpcionais) {
    return (
      <div id="orcamento-container">
        <h1 id="orcamento-logo">
          ELO <span>DRINKS</span>
        </h1>
        <p>Carregando dados do orçamento ou orçamento inicializando...</p>
        {/* Botão para debug ou voltar pode ser útil aqui */}
      </div>
    );
  }

  return (
    // Seu JSX para renderizar o resumo permanece o mesmo
    // Apenas certifique-se de que está acessando as propriedades de forma segura (ex: opcionais.shots && ...)
    // E que a URL no fetch é a correta (provavelmente http://localhost:5252, verifique seu backend)
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
          {baseFesta && Object.entries(baseFesta).map(([key, value]) => { // Adicionado check para baseFesta
            if (key === "drinksSelecionados" && Array.isArray(value)) {
              return (
                <div key={key} className="campo">
                  <strong>Drinks Selecionados:</strong>
                  <ul>
                    {value.map((drink, index) => (
                      <li key={index}>{drink.nome || String(drink)}</li>
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

        <div className="section-title">OPCIONAIS</div>
        <div id="linha-horizontal-infos" />

        <div id="opcionais">
          <div id="opcionais-shots">
            <strong>Shots:</strong>
            <ul>
              {opcionais.shots && dadosOpcionais.shotsData && Object.entries(opcionais.shots)
                .filter(([_, val]) => val > 0)
                .map(([key, val]) => {
                  const shot = dadosOpcionais.shotsData.find(
                    (s) => s.idItem === key
                  );
                  return (
                    <li key={key}>
                      {shot ? shot.nome : key}: {val}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div id="opcionais-extras">
            <strong>Extras:</strong>
            <ul>
              {opcionais.extras && dadosOpcionais.extrasData && Object.entries(opcionais.extras)
                .filter(([_, val]) => val > 0)
                .map(([key, val]) => {
                  const extra = dadosOpcionais.extrasData.find(
                    (e) => e.idItem === key
                  );
                  return (
                    <li key={key}>
                      {extra ? extra.nome : key}: {val}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div id="opcionais-bares">
            <strong>Bares Adicionais:</strong>
            <ul>
              {opcionais.baresAdicionais && dadosOpcionais.baresData &&
              opcionais.baresAdicionais.length > 0 ? (
                opcionais.baresAdicionais.map((barId) => { // Renomeado para barId
                  const barData = dadosOpcionais.baresData.find(
                    (b) => b.idItem === barId
                  );
                  return <li key={barId}>{barData ? barData.nome : barId}</li>;
                })
              ) : (
                <li>Nenhum</li>
              )}
            </ul>
          </div>

          <div id="preco-final">
            <strong>Preço final:</strong> R$ {calcularPreco().toFixed(2)}
          </div>
        </div>

        <div id="orcamento-footer">
          {/* Adicionando feedback de loading/erro ao botão */}
          <button type="button" onClick={handleConfirmar} disabled={status.loading}>
            {status.loading ? 'ENVIANDO...' : 'CONFIRMAR ENVIO'}
          </button>
        </div>
        {/* Exibindo mensagem de erro, se houver */}
        {status.error && (
            <div style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
                <strong>Erro:</strong> {status.error}
            </div>
        )}
      </div>
    </div>
  );
}