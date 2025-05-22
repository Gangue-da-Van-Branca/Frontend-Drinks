import React, { useState } from "react";
import "../../pages/AdminPage/AdminPage.css";

export default function BarForm() {
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bar cadastrado:", { nome, capacidade });
    setNome("");
    setCapacidade("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Bar</h3>
      <label>
        Nome do Bar:
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
      </label>

      <label>
        Capacidade:
        <input 
          type="number" 
          value={capacidade} 
          onChange={(e) => setCapacidade(e.target.value)} 
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

      <button type="submit">Salvar Bar</button>
    </form>
  );
}
