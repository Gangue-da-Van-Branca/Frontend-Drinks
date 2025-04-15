import React from "react";
import "./SecaoEscolhaPacote.css";

const SecaoEscolhaPacote = () => {
  return (
    <section className="escolha-pacote" id="escolha-pacote">
      <div className="escolha-pacote-overlay"></div>

      <div className="escolha-pacote-content">
        <div className="titlePacote">
          <h1>Escolha seu</h1>
          <p>ELO DRINKS</p>
        </div>
        <div className="teste">
          <div className="box-esq"></div>
          <p>Pacote</p>
        </div>
      </div>
    </section>
  );
};

export default SecaoEscolhaPacote;
