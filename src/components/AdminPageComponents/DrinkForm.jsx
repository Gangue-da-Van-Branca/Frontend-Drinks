import React, { useState } from "react";
import "../../pages/AdminPage/AdminPage.css";

export default function DrinkForm() {
  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [preco, setPreco] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Drink cadastrado:", { nome, ingredientes });
    setNome("");
    setIngredientes("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Drink</h3>
      <label>
        Nome do Drink:
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required 
        />
      </label>

      <label>
        Ingredientes:
        <textarea 
          value={ingredientes} 
          onChange={(e) => setIngredientes(e.target.value)} 
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

      <button type="submit">Salvar Drink</button>
    </form>
  );
}
