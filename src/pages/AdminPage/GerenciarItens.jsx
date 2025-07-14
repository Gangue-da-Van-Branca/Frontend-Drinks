import React, { useEffect, useState } from "react";
import ItemForm from "../../components/AdminPageComponents/ItemForm";
import { FaPen, FaTrash } from "react-icons/fa"; 
import { toast } from "react-toastify";
import "./AdminPage.css";

export default function GerenciarItens() {
  const [itens, setItens] = useState([]);
  const [itemEditado, setItemEditado] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const itensPorPagina = 10;

  const carregarItens = () => {
    fetch(`${import.meta.env.VITE_API_URL}/Item`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => setItens(data))
    .catch(err => toast.error("Erro ao carregar itens:", err));
  };

  useEffect(() => {
    carregarItens();
  }, []);

  const handleExcluir = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/Item/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir item");
    }

    toast.success("Item excluído com sucesso!");
    await carregarItens();
  } catch (err) {
    toast.error("Erro ao excluir item:", err);
  }
};


  const handleEditar =async (item) => {
    setItemEditado(item);
    await carregarItens();
  };

  const tipos = ["Todos", "Drink Alcoólico", "Soft Drink", "Bar", "Opcional", "Shot"];

  const itensFiltrados = itens.filter(item => {
    const nomeMatch = item.nome.toLowerCase().includes(busca.toLowerCase());
    const tipoMatch = filtroTipo === "Todos" || item.tipo === filtroTipo;
    return nomeMatch && tipoMatch;
  });

  const totalPaginas = Math.ceil(itensFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const itensPaginados = itensFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);

  return (
    <div className="gerenciar-container">
      <ItemForm itemEditado={itemEditado} onItemSalvo={carregarItens}   setItemEditado={setItemEditado} />

      <h3>Itens Cadastrados</h3>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      <ul className="item-list">
        {itensPaginados.map(item => (
          <li key={item.idItem} className="item-card">
            <div className="item-info">
              <strong>{item.nome}</strong> - R$ {item.preco.toFixed(2)} - {item.tipo}
              <span>{item.descricao}</span>
            </div>
            <div className="item-actions">
              <button 
                className="icon-btn-edit-btn" 
                onClick={() => handleEditar(item)}
                title="Editar"
              >
                <FaPen />
              </button>
              <button 
                className="icon-btn-delete-btn" 
                onClick={() => handleExcluir(item.idItem)}
                title="Excluir"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="paginacao">
        <button onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>Página {paginaAtual} de {totalPaginas}</span>
        <button onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>
    </div>
  );
}
