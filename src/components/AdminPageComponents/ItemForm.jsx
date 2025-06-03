import React, { useState, useEffect } from "react";
import "./ItemForm.css";

export default function ItemForm({ itemEditado, onItemSalvo }) {
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
    }
  }, [itemEditado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      ...formData,
      preco: parseFloat(formData.preco),
    };

    const url = itemEditado
      ? `http://localhost:8080/Item/${itemEditado.idItem}`
      : "http://localhost:8080/Item";

    const method = itemEditado ? "PUT" : "POST";

    const body = itemEditado ? JSON.stringify(item) : JSON.stringify([item]);

    console.log(
      "JSON do Item a ser enviado:",
      JSON.stringify(itemEditado ? item : [item], null, 2)
    );

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body,
    })
      .then(handleResponse)
      .then(() => {
        onItemSalvo();
        if (!itemEditado) {
          setFormData({
            nome: "",
            descricao: "",
            preco: "",
            tipo: "",
          });
        }
      })
      .catch(console.error);
  };

  const handleResponse = (res) => {
    if (!res.ok) {
      return res.json().then((err) => {
        throw new Error(JSON.stringify(err));
      });
    }
    return res.json();
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
            <option value="Drink Alcólico">Drink Alcólico</option>
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
