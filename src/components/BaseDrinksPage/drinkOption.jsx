import React from "react";

export default function DrinkOption({
  nome,
  descricao,
  selecionado,
  aoSelecionar,
}) {
  return (
    <div
      id="drink-option"
      onClick={aoSelecionar}
      style={{ 
        border: selecionado ? "2px solid #4caf50" : "1px solid #ccc",
        backgroundColor: selecionado ? '#e8f5e9' : '#fff',
        padding: '12px',
        borderRadius: '10px',
        cursor: 'pointer',
        margin: '8px',
        width: '200px'
    }}
    >
        <h4 id="nome-drink">{nome}</h4>
        <p id="descricao-drink">{descricao}</p>
    </div>

  );
}
