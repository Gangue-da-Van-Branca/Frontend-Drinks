import React, { useEffect, useState } from "react";
import ItemForm from "../../components/AdminPageComponents/ItemForm";
import { FaPen, FaTrash } from "react-icons/fa"; 

import "./AdminPage.css";

export default function GerenciarItens() {
  const [itens, setItens] = useState([]);
  const [itemEditado, setItemEditado] = useState(null);

  const carregarItens = () => {
    fetch(`${import.meta.env.VITE_API_URL}Item`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => setItens(data))
    .catch(err => console.error("Erro ao carregar itens:", err));
  };

  useEffect(() => {
    carregarItens();
  }, []);

  const handleExcluir = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}Item/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => {
      console.log("Item excluído com sucesso!");
      carregarItens();
    })
    .catch(err => console.error("Erro ao excluir item:", err));
  };

  const handleEditar = (item) => {
    setItemEditado(item);
  };

  return (
    <div className="gerenciar-container">
      <ItemForm itemEditado={itemEditado} onItemSalvo={carregarItens} />

      <h3>Itens Cadastrados</h3>
      <ul className="item-list">
        {itens.map(item => (
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
    </div>
  );
}
