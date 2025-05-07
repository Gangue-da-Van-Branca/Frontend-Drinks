import React from "react";
import './TipoFesta.css';

const tiposFesta = [
  "Casamento",
  "Evento Corporativo",
  "Evento de Lançamento",
  "Coquetel",
  "Aniversário",
  "Debutante",
  "Festa Teen",
  "Outro",
];

function TipoFesta({ tipoSelecionado, setTipoSelecionado, outroTipo, setOutroTipo }) {
  return (
    <div className="campo-tipo-festa">
      <div className="subtitulo-tipo">Tipo de Festa</div>
      <div className="tipo-opcoes">
        {tiposFesta.map((tipo) => (
          <label key={tipo} className="tipo-opcao">
            <input
              type="radio"
              name="tipoFesta"
              value={tipo}
              checked={tipoSelecionado === tipo}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            />
            {tipo}
            {tipo === "Outro" && tipoSelecionado === "Outro" && (
              <input
                type="text"
                className="campo-outro"
                placeholder="Digite o tipo de festa"
                value={outroTipo}
                onChange={(e) => setOutroTipo(e.target.value)}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

export default TipoFesta;
