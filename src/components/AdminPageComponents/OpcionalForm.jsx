import React, { useState } from "react";
import "../../pages/AdminPage/AdminPage.css";

export default function OpcionalForm() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Opcional cadastrado:", { nome, preco });
    setNome("");
    setPreco("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Opcional</h3>
      <label>
        Nome do Opcional:
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
      </label>

      <label>
        Preço:
        <input 
          type="number" 
          value={preco} 
          onChange={(e) => setPreco(e.target.value)} 
          required 
        />
      </label>

      <button type="submit">Salvar Opcional</button>
    </form>
  );
}
