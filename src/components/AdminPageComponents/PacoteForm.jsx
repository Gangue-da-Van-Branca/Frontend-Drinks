import React, { useState } from "react";
import "../../pages/AdminPage/AdminPage.css";

export default function PacoteForm() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pacote cadastrado:", { nome, descricao });
    //add back dps
    setNome("");
    setDescricao("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Pacote</h3>
      <label>
        Nome do Pacote:
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

      <label>Preço:</label>
      <input
        type="number"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        placeholder="Preço do drink"
      />

      <button type="submit">Salvar Pacote</button>
    </form>
  );
}
