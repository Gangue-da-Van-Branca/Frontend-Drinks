import React, { useState, useEffect } from "react";
import "./ItemForm.css";
import { toast } from "react-toastify";

export default function ItemForm({ itemEditado, onItemSalvo, setItemEditado }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    tipo: "",
  });

  useEffect(() => {
  if (itemEditado) {
    setFormData({
      nome: itemEditado.nome,
      descricao: itemEditado.descricao,
      preco: itemEditado.preco,
      tipo: itemEditado.tipo,
    });
  } else {
    setFormData({
      nome: "",
      descricao: "",
      preco: "",
      tipo: "",
    });
  }
}, [itemEditado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = {
      ...formData,
      preco: parseFloat(formData.preco),
    };

    const url = itemEditado
      ? `${import.meta.env.VITE_API_URL}/Item/${itemEditado.idItem}`
      : `${import.meta.env.VITE_API_URL}/Item`;

    const method = itemEditado ? "PUT" : "POST";
    const body = itemEditado ? JSON.stringify(item) : JSON.stringify([item]);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(JSON.stringify(errData));
      }

      await onItemSalvo(); 
      setItemEditado(null);
      toast.success(itemEditado ? "Item atualizado com sucesso!" : "Item cadastrado com sucesso!");

      if (!itemEditado) {
        setFormData({
          nome: "",
          descricao: "",
          preco: "",
          tipo: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h3>{itemEditado ? "Editar Item" : "Cadastrar Novo Item"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Item</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Ex: Caipirinha de Limão"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            className="form-control"
            value={formData.descricao}
            onChange={handleChange}
            required
            placeholder="Descreva os ingredientes e características do item"
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço (R$)</label>
          <input
            type="number"
            id="preco"
            name="preco"
            className="form-control"
            value={formData.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            placeholder="Ex: 12.50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo do Item</label>
          <select
            id="tipo"
            name="tipo"
            className="form-control"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione um tipo
            </option>
            <option value="Drink Alcoólico">Drink Alcoólico</option>
            <option value="Soft Drink">Soft Drink</option>
            <option value="Bar">Bar</option>
            <option value="Opcional">Opcional</option>
            <option value="Shot">Shot</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          {itemEditado ? "Salvar Alterações" : "Cadastrar Item"}
        </button>
      </form>
    </div>
  );
}
