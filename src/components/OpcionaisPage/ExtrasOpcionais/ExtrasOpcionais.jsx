import React, { useState } from 'react';
import './ExtrasOpcionais.css';

const outros = [
  { titulo: 'Cerveja Stella Artois ou Heineken 250 ml', precoPorUnidade: 9.00 },
  { titulo: 'Whisky Black Label', precoPorUnidade: 160.00 },
  { titulo: 'Whisky Johnnie Walker Red Label', precoPorUnidade: 100.00 },
  { titulo: 'Espumante Freixenet Brut', precoPorUnidade: 75.00 },
  { titulo: 'Espumante Salton Brut', precoPorUnidade: 40.00 },
  { titulo: 'Drink na Lâmpada', precoPorUnidade: 8.00 },
];

export default function OutrosOpcionais() {
  const [quantidades, setQuantidades] = useState({});

  const handleChange = (titulo, valor) => {
    const quantidade = parseInt(valor) || 0;
    setQuantidades((prev) => ({ ...prev, [titulo]: quantidade }));
  };

  const total = outros.reduce((acc, item) => {
    const quantidade = quantidades[item.titulo] || 0;
    return acc + quantidade * item.precoPorUnidade;
  }, 0);

  return (
    <div className="outros-wrapper">
      <h2 className="outros-titulo">OUTROS OPCIONAIS</h2>

      <div className="outros-container">
        {outros.map((item, index) => (
          <div className="outro-card" key={index}>
            <span className="outro-titulo">{item.titulo}:</span>
            <span className="outro-preco">+ R$ {item.precoPorUnidade.toFixed(2)}/unidade</span>
            <input
              type="number"
              min="0"
              step="10"
              value={quantidades[item.titulo] || 0}
              onChange={(e) => handleChange(item.titulo, e.target.value)}
              className="outro-input"
            />
          </div>
        ))}
      </div>

      <div className="total-outro">
        Total: <span className="total-valor">R$ {total.toFixed(2)}</span>
      </div>

      
    </div>
  );
}
