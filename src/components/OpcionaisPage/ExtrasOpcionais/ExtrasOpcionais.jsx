import React from 'react';
import './ExtrasOpcionais.css';

export default function ExtrasOpcionais({ extrasData, extras, setExtras }) {
  const handleChange = (idItem, valor) => {
    const quantidade = parseInt(valor) || 0;
    setExtras((prev) => ({ ...prev, [idItem]: quantidade }));
  };

  const total = extrasData.reduce((acc, item) => {
    const quantidade = extras[item.idItem] || 0;
    return acc + quantidade * item.preco;
  }, 0);

  return (
    <div className="outros-wrapper">
      <h2 className="outros-titulo">OUTROS OPCIONAIS</h2>
      <div className="outros-container">
        {extrasData.map((item) => (
          <div className="outro-card" key={item.idItem}>
            <span className="outro-titulo">{item.nome}:</span>
            <span className="outro-preco">+ R$ {item.preco.toFixed(2)}/unidade</span>
            <input
              type="number"
              min="0"
              step="1"
              value={extras[item.idItem] || 0}
              onChange={(e) => handleChange(item.idItem, e.target.value)}
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
