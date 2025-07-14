import React, { useEffect, useState } from "react";
import OrcamentoCard from "./OrcamentoCard";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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
          fetch(`${import.meta.env.VITE_API_URL}/Orcamento`),
          fetch(`${import.meta.env.VITE_API_URL}/Pedido`),
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

        combinados.sort((b, a) => b.idOrcamento - a.idOrcamento);

        setOrcamentosComPedido(combinados);
      } catch (err) {
        toast.error("Erro ao carregar dados:", err);
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
        `${import.meta.env.VITE_API_URL}/Pedido/${pedido.idPedido}/${pedido.orcamentoIdOrcamento}/${pedido.orcamentoUsuarioIdUsuario}`,
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

      setOrcamentosComPedido((prev) =>
        prev.map((orc) =>
          orc.pedido?.idPedido === pedido.idPedido
            ? { ...orc, pedido: { ...pedido, status: novoStatus } }
            : orc
        )
      );
    } catch (error) {
      toast.error("Erro:", error);
      toast.alert("Erro ao atualizar status do pedido.");
    }
  }

  async function aprovarOrcamento(orcamento) {
  if (orcamento.pedido) {
    const result = await Swal.fire({
      title: 'Aprovar pedido?',
      text: `Deseja mesmo aprovar esse pedido?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, aprovar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      atualizarStatusPedido(orcamento, "Aprovado");
    }
  }
}

  async function rejeitarOrcamento(orcamento) {
  if (orcamento.pedido) {
    const result = await Swal.fire({
      title: 'Cancelar pedido?',
      text: `Deseja mesmo cancelar esse pedido?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, cancelar',
      cancelButtonText: 'Voltar'
    });

    if (result.isConfirmed) {
      atualizarStatusPedido(orcamento, "Cancelado");
    }
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
