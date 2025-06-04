import React, { useEffect, useState } from "react";
import "./MeusPedidos.css";

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pedidoAtivo, setPedidoAtivo] = useState(null);
  const [orcamentos, setOrcamentos] = useState({}); 

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
        const response = await fetch(`http://localhost:8080/Pedido/usuario/${idUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
        const response = await fetch(`http://localhost:8080/Orcamento/${orcamentoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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

  if (erro) {
    return <p id="meus-pedidos-erro">Erro: {erro}</p>;
  }

  if (pedidos.length === 0) {
    return <p id="meus-pedidos-vazio">Você não possui pedidos.</p>;
  }

  return (
    <div id="meus-pedidos-container">
      <h2 id="meus-pedidos-titulo">Meus Pedidos</h2>
      <ul id="meus-pedidos-lista">
        {pedidos.map((pedido, index) => {
          const orcamento = orcamentos[pedido.orcamentoIdOrcamento];
          return (
            <li key={index} id="meus-pedidos-item" onClick={() => toggleDetalhes(index, pedido.orcamentoIdOrcamento)}>
              <div id="meus-pedidos-resumo">
                <p id="meus-pedidos-status"><strong>Status:</strong> {pedido.status}</p>
                <p id="meus-pedidos-total"><strong>Total:</strong> R$ {pedido.total?.toFixed(2)}</p>
              </div>

              {pedidoAtivo === index && orcamento && (
                <div id="meus-pedidos-detalhes">
                  <h4>Drinks</h4>
                  {orcamento.drinks?.length ? (
                    <ul>
                      {orcamento.drinks.map((drink, idx) => (
                        <li key={idx}>{drink.nome}</li>
                      ))}
                    </ul>
                  ) : <p>Sem drinks.</p>}

                  <h4>Opcionais</h4>
                  {orcamento.opcionais?.length ? (
                    <ul>
                      {orcamento.opcionais.map((opcional, idx) => (
                        <li key={idx}>{opcional.nome}</li>
                      ))}
                    </ul>
                  ) : <p>Sem opcionais.</p>}

                  <h4>Convidados</h4>
                  {orcamento.convidados?.length ? (
                    <ul>
                      {orcamento.convidados.map((convidado, idx) => (
                        <li key={idx}>{convidado.nome}</li>
                      ))}
                    </ul>
                  ) : <p>Sem convidados.</p>}
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
  );
}
