import React from "react";
import "./ShotsOpcionais.css";

export default function ShotsNaPista({ shotsData, shots, setShots }) {
  const handleChange = (idItem, valor) => {
    const quantidade = parseInt(valor) || 0;
    setShots((prev) => ({ ...prev, [idItem]: quantidade }));
  };

  const total = shotsData.reduce((acc, shot) => {
    const quantidade = shots[shot.idItem] || 0;
    return acc + quantidade * shot.preco;
  }, 0);

  return (
    <div className="shots-wrapper">
      <h2 className="shots-titulo">SHOTS</h2>

      <div className="shots-container">
        {shotsData.map((shot) => (
          <div className="shot-card" key={shot.idItem}>
            <span className="shot-titulo">{shot.nome}:</span>
            <span className="shot-preco">
              + R$ {shot.preco.toFixed(2)}/unidade
            </span>
            <input
              type="number"
              min="0"
              step="1"
              value={shots[shot.idItem] || 0}
              onChange={(e) => handleChange(shot.idItem, e.target.value)}
              className="shot-input"
            />
          </div>
        ))}
      </div>
      <div className="total-shot">
        Total: <span className="total-valor">R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
