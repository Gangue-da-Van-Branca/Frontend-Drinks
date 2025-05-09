import React, { useState, useEffect } from "react";
import "./ShotsOpcionais.css";

const shots = [
  { titulo: "Mini Beer (Licor 43) com espuma", precoPor50: 600 },
  { titulo: "Tequila de café em copinhos de chocolate", precoPor50: 800 },
  { titulo: "Busca Vida artesanal em mini garrafas", precoPor50: 500 },
  { titulo: "Jagermeister em tubos de ensaio", precoPor50: 500 },
  { titulo: "Mini milk-shakes de Oreo", precoPor50: 750 },
];

export default function ShotsNaPista({ onChangeTotal }) {
  const [quantidades, setQuantidades] = useState({});

  const handleChange = (titulo, valor) => {
    const quantidade = parseInt(valor) || 0;
    setQuantidades((prev) => ({ ...prev, [titulo]: quantidade }));
  };

  const total = shots.reduce((acc, shot) => {
    const quantidade = quantidades[shot.titulo] || 0;
    return acc + (quantidade / 50) * shot.precoPor50;
  }, 0);

useEffect(() => {
    onChangeTotal?.(total); 
  }, [total, onChangeTotal]);

  return (
    <div className="shots-wrapper">
      <h2 className="shots-titulo">SHOTS NA PISTA</h2>
      <p className="shots-subtitulo">para cada 50 shots</p>

      <div className="shots-container">
        {shots.map((shot, index) => (
          <div className="shot-card" key={index}>
            <span className="shot-titulo">{shot.titulo}:</span>
            <span className="shot-preco">
              + R$ {shot.precoPor50.toFixed(2)}
            </span>
            <input
              type="number"
              min="0"
              step="50"
              value={quantidades[shot.titulo] || 0}
              onChange={(e) => handleChange(shot.titulo, e.target.value)}
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
