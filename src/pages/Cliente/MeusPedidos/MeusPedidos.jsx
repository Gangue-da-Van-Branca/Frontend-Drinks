import React, { useEffect, useState } from "react";
import Header2 from "../../../components/Header2/Header2";
import "./MeusPedidos.css";

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pedidoAtivo, setPedidoAtivo] = useState(null);
  const [orcamentos, setOrcamentos] = useState({});
  const [nome, setNome] = useState(localStorage.getItem("nome") || null);

  useEffect(() => {
  const fetchPedidos = async () => {
    const idUsuario = localStorage.getItem("idUsuario");
    const token = localStorage.getItem("token");

    if (!idUsuario || !token) {
      setErro("Usuário não autenticado.");
      setCarregando(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Pedido/usuario/${idUsuario}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 404) {
        // Se a API retornar 404, interpretamos como "nenhum pedido"
        setPedidos([]);
        setCarregando(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao buscar pedidos.");
      }

      const data = await response.json();
      setPedidos(data);
    } catch (err) {
      console.error("Erro:", err);
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  fetchPedidos();
}, []);


  const toggleDetalhes = async (index, orcamentoId) => {
    const token = localStorage.getItem("token");

    if (!orcamentos[orcamentoId]) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/Orcamento/${orcamentoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar orçamento.");
        }

        const data = await response.json();
        setOrcamentos((prev) => ({ ...prev, [orcamentoId]: data }));
      } catch (err) {
        console.error("Erro ao carregar orçamento:", err);
      }
    }

    setPedidoAtivo(pedidoAtivo === index ? null : index);
  };

  if (carregando) {
    return <p id="meus-pedidos-loading">Carregando pedidos...</p>;
  }

  

  return (
    <div id="cont">
      <Header2 nome={nome} setNome={setNome} />
      <div id="meus-pedidos-container">
        <h2 id="meus-pedidos-titulo">Meus Pedidos</h2>
        <ul id="meus-pedidos-lista">
          {pedidos.map((pedido, index) => {
            const orcamento = orcamentos[pedido.orcamentoIdOrcamento];
            return (
              <li
                key={index}
                id="meus-pedidos-item"
                onClick={() =>
                  toggleDetalhes(index, pedido.orcamentoIdOrcamento)
                }
              >
                <div id="meus-pedidos-resumo">
                  <p id="meus-pedidos-status">
                    <strong>Status:</strong> {pedido.status}
                  </p>
                  <p id="meus-pedidos-total">
                    <strong>Total:</strong> R$ {pedido.total?.toFixed(2)}
                  </p>
                </div>

                {pedidoAtivo === index && orcamento && (
                  <div id="meus-pedidos-detalhes">
                    <h4>Tipo de Festa</h4>
                    <p>
                      {orcamento.baseFesta.tipoFesta || "Tipo não informado"}
                    </p>

                    <h4>Drinks</h4>
                    {orcamento.baseFesta?.drinksSelecionados?.length ? (
                      <ul>
                        {orcamento.baseFesta.drinksSelecionados.map(
                          (drink, idx) => (
                            <li key={idx}>{drink.nome}</li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>Sem drinks.</p>
                    )}

                    <h4>Opcionais - Shots</h4>
                    {orcamento.opcionais?.shots.length > 0 ? (
                      <ul>
                        {Object.entries(orcamento.opcionais.shots).map(
                          ([nome, qtd], idx) => (
                            <li key={idx}>
                              {nome}: {qtd}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>Sem shots.</p>
                    )}

                    <h4>Opcionais - Extras</h4>
                    {orcamento.opcionais?.extras.length > 0 ? (
                      <ul>
                        {Object.entries(orcamento.opcionais.extras).map(
                          ([nome, qtd], idx) => (
                            <li key={idx}>
                              {nome}: {qtd}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>Sem extras.</p>
                    )}

                    <h4>Opcionais - Bares Adicionais</h4>
                    {orcamento.opcionais?.baresAdicionais?.length > 0 ? (
                      <ul>
                        {orcamento.opcionais.baresAdicionais.map((bar, idx) => (
                          <li key={idx}>{bar}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>Sem bares adicionais.</p>
                    )}

                    <h4>Convidados</h4>
                    <p>
                      {orcamento.infosContratante?.convidados ||
                        "Sem convidados informados"}
                    </p>
                  </div>
                )}

                {pedidoAtivo === index && !orcamento && (
                  <div id="meus-pedidos-detalhes">
                    <p>Carregando detalhes...</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
