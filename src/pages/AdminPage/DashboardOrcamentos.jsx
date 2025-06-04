import React, { useEffect, useState } from "react";
import OrcamentoCard from "./OrcamentoCard";
import "./DashboardOrcamento.css";

export default function DashboardOrcamentos() {
  const [orcamentosComPedido, setOrcamentosComPedido] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const [resOrc, resPed] = await Promise.all([
          fetch("http://localhost:8080/Orcamento"),
          fetch("http://localhost:8080/Pedido"),
        ]);

        if (!resOrc.ok || !resPed.ok) {
          throw new Error("Erro ao buscar dados do servidor");
        }

        const orcamentosData = await resOrc.json();
        const pedidosData = await resPed.json();

        const combinados = orcamentosData.map((orc) => {
          const pedidoRelacionado = pedidosData.find(
            (ped) => ped.orcamentoIdOrcamento === orc.idOrcamento
          );
          return { ...orc, pedido: pedidoRelacionado };
        });

        setOrcamentosComPedido(combinados);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    fetchData();
  }, []);

  async function atualizarStatusPedido(orcamento, novoStatus) {
    const pedido = orcamento.pedido;

    try {
      const response = await fetch(
        `http://localhost:8080/Pedido/${pedido.idPedido}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            total: pedido.total,
            status: novoStatus,
            orcamentoIdOrcamento: pedido.orcamentoIdOrcamento,
            orcamentoUsuarioIdUsuario: pedido.orcamentoUsuarioIdUsuario,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do pedido");
      }

      const pedidoAtualizado = await response.json();

      // Atualiza o estado local
      setOrcamentosComPedido((prev) =>
        prev.map((orc) =>
          orc.pedido?.idPedido === pedido.idPedido
            ? { ...orc, pedido: pedidoAtualizado }
            : orc
        )
      );
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao atualizar status do pedido.");
    }
  }

  function aprovarOrcamento(orcamento) {
    if (orcamento.pedido) {
      atualizarStatusPedido(orcamento, "Aprovado");
    }
  }

  function rejeitarOrcamento(orcamento) {
    if (orcamento.pedido) {
      atualizarStatusPedido(orcamento, "Cancelado");
    }
  }

  if (carregando) {
    return <p>Carregando orçamentos...</p>;
  }

  if (erro) {
    return <p>Erro: {erro}</p>;
  }

  if (orcamentosComPedido.length === 0) {
    return <p>Não há orçamentos disponíveis.</p>;
  }

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensAtuais = orcamentosComPedido.slice(
    indicePrimeiroItem,
    indiceUltimoItem
  );

  const totalPaginas = Math.ceil(orcamentosComPedido.length / itensPorPagina);

  function proximaPagina() {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  }

  function paginaAnterior() {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  return (
    <div id="dashboard-orcamentos">
      <h2>Dashboard de Orçamentos</h2>

      {itensAtuais.map((orcamento, index) => (
        <OrcamentoCard
          key={orcamento.idOrcamento}
          orcamento={orcamento}
          index={indicePrimeiroItem + index}
          onAprovar={aprovarOrcamento}
          onRejeitar={rejeitarOrcamento}
        />
      ))}

      <div id="paginacao">
        <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>
    </div>
  );
}
