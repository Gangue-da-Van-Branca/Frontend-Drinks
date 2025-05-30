import React, { useState } from "react";
import "../../pages/AdminPage/AdminPage.css";

export default function ItemForm() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      nome,
      descricao,
      preco: parseFloat(preco),
      tipo,
    };

    const payload = [item];

    console.log("Item cadastrado:", payload);

    // Aqui você faz o POST para o backend
    fetch("http://localhost:8080/Item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item cadastrado com sucesso:", data);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar item:", error);
      });

    setNome("");
    setDescricao("");
    setPreco("");
    setTipo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Item</h3>

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

      <button type="submit">Salvar Item</button>
    </form>
  );
}
