import React from 'react';
import './BaresOpcionais.css';

const bares = [
  {
    titulo: 'Bar de Caipirinhas – Vodka, Saquê e Cachaça',
    preco: 1200,
    itens: ['Abacaxi com hortelã', 'Uva com manjericão', 'Kiwi com limão']
  },
  {
    titulo: 'Bar de Gin Tônica + Box de Especiarias',
    preco: 1400,
    itens: [
      'TORANJA TONIC – Gin, xarope de grapefruit, tangerina, pimenta rosa e tônica',
      'CLASSIC TONIC – Gin, limão siciliano, zimbro e tônica'
    ]
  },
  {
    titulo: 'Bar Rústico',
    preco: 1600,
    itens: [
      'Caipirinha flambada com cachaça envelhecida',
      'Drink de catuaba com frutas vermelhas e espuma de maracujá',
      'Moscow Mule na caneca de cobre com espuma de gengibre'
    ]
  },
  {
    titulo: 'Bar Whiskeria – Harmonizações',
    preco: 3500,
    itens: [
      'Gelos em cubos com folha de ouro, Gelos em Esferas, Zest de casca de limão siciliano e Zest de casca de laranja e defumação.'
    ]
  },
  {
    titulo: 'Bar de Café & Expresso Drinks',
    preco: 1300,
    itens: ['Espresso Martini', 'Irish Coffee', 'Cold Brew Tônica']
  },
  {
    titulo: 'Ponche para Welcome Drink',
    preco: 3500,
    itens: [
      'Lillet, hortelã, laranja bahia e tônica com gelo especial (Bloco grande de gelo com Orquídea)'
    ]
  }
];

export default function BaresOpcionais({ barSelecionado, setBarSelecionado }) {

  const toggleSelecionado = (titulo) => {
    setBarSelecionado((prev) =>
      prev.includes(titulo)
        ? prev.filter((t) => t !== titulo)
        : [...prev, titulo]
    );
  };

  const total = bares
    .filter((bar) => barSelecionado.includes(bar.titulo))
    .reduce((acc, bar) => acc + bar.preco, 0);

  return (
    <div className="bares-container">
      <h2>BARES</h2>
      <div className="bares-lista">
        {bares.map((bar, index) => (
          <div className="bar-card" key={index}>
            <div className="bar-header">
              <label className="bar-checkbox">
                <input
                  type="checkbox"
                  checked={barSelecionado.includes(bar.titulo)}
                  onChange={() => toggleSelecionado(bar.titulo)}
                />
                <span className="bar-titulo">{bar.titulo}</span>
              </label>
              <div className="bar-preco">+ R$ {bar.preco.toFixed(2)}</div>
            </div>
            <ul className="bar-itens">
              {bar.itens.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="total-bar">
        Total: <span className="total-valor">R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
