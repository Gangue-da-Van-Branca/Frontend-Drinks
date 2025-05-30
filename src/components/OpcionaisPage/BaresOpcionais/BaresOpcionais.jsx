import React from 'react';
import './BaresOpcionais.css';

export default function BaresOpcionais({ bares, barSelecionado, setBarSelecionado }) {

  const toggleSelecionado = (idItem) => {
    setBarSelecionado((prev) =>
      prev.includes(idItem)
        ? prev.filter((id) => id !== idItem)
        : [...prev, idItem]
    );
  };

  const total = bares
    .filter((bar) => barSelecionado.includes(bar.idItem))
    .reduce((acc, bar) => acc + bar.preco, 0);

  return (
    <div className="bares-container">
      <h2>BARES</h2>
      <div className="bares-lista">
        {bares.map((bar) => (
          <div className="bar-card" key={bar.idItem}>
            <div className="bar-header">
              <label className="bar-checkbox">
                <input
                  type="checkbox"
                  checked={barSelecionado.includes(bar.idItem)}
                  onChange={() => toggleSelecionado(bar.idItem)}
                />
                <span className="bar-titulo">{bar.nome}</span>
              </label>
              <div className="bar-preco">+ R$ {bar.preco.toFixed(2)}</div>
            </div>
            <p>{bar.descricao}</p>
          </div>
        ))}
      </div>
      <div className="total-bar">
        Total: <span className="total-valor">R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
