import React, { useState, useEffect } from "react";
import "../../pages/AdminPage/AdminPage.css";

export default function ItemForm({ itemEditado, onItemSalvo }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (itemEditado) {
      setNome(itemEditado.nome);
      setDescricao(itemEditado.descricao);
      setPreco(itemEditado.preco);
      setTipo(itemEditado.tipo);
    }
  }, [itemEditado]);

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setPreco("");
    setTipo("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      nome,
      descricao,
      preco: parseFloat(preco),
      tipo,
    };

    let payload = [item];
    let url = "http://localhost:8080/Item";
    let method = "POST";

    if (itemEditado) {
      url = `http://localhost:8080/Item/${itemEditado.idItem}`;
      method = "PUT";
      payload = [itemEditado];
    }

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(JSON.stringify(errorData));
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Item salvo:", data);
        onItemSalvo();
        limparFormulario();
      })
      .catch((err) => console.error("Erro ao salvar item:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{itemEditado ? "Editar Item" : "Cadastrar Novo Item"}</h3>

      <label>
        Nome do Item:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </label>

      <label>
        Descrição:
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
      </label>

      <label>
        Preço:
        <input
          type="number"
          step="0.01"
          min="0"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
      </label>

      <label>
        Tipo:
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="" disabled>
            Escolher tipo do item
          </option>
          <option value="Drink Alcólico">Drink Alcólico</option>
          <option value="Soft Drink">Soft Drink</option>
          <option value="Bar">Bar</option>
          <option value="Opcional">Opcional</option>
          <option value="Shot">Shot</option>
        </select>
      </label>

      <button type="submit">
        {itemEditado ? "Salvar Alterações" : "Salvar Item"}
      </button>
    </form>
  );
}
