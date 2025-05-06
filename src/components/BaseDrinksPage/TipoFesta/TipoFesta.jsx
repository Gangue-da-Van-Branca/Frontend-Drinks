import React from "react";
import './TipoFesta.module.css';

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

function TipoFesta({tipoSelecionado,setTipoSelecionado,outroTipo,setOutroTipo}) {
  return (
    <div id="campo-tipo-festa">
      <h2 id="subtitulo-tipo">Tipo de Festa</h2>
      <div id="tipo-opcoes">
        {tiposFesta.map((tipo) => (
          <label key={tipo} id="tipo-opcao">
            <input
              type="radio"
              name="tipoFesta"
              value={tipo}
              checked={tipoSelecionado === tipo}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            />
            {tipo}
          </label>
        ))}
      </div>
      {tipoSelecionado === 'Outro' && (
        <input type="text" id="campo-outro" placeholder="Digite o tipo de festa" value={outroTipo} onChange={(e) => setOutroTipo(e.target.value)} />
      )}
    </div>
  );
}

export default TipoFesta;
