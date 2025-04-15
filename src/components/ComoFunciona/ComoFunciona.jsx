import React from "react";
import "./ComoFunciona.css";

const QuemSomos = () => {
  return (
    <section className="como-funciona" id="como-funciona">
      <div className="titleFunciona">
        <h1>COMO</h1>
        <p>ELO DRINKS</p>
      </div>
      <div className="teste">
        <div className="box-esq"></div>
        <p>FUNCIONAMOS</p>
        <div className="line-top"></div>
      </div>
      <div id="steps">
        <div id="step">
          <h2>
            <span>1</span>ESCOLHA<em>SEU PACOTE</em>
          </h2>
          <p>
            Nossos pacotes já vêm prontos para você aproveitar sem preocupação.
            Escolha o combo que mais combina com o seu evento e prepare-se para
            brindar.
          </p>
          <button>Escolher Pacote ➔</button>
        </div>

        <div id="step">
          <h2>
            <span>2</span>ADICIONE<em>SUAS IDEIAS</em>
          </h2>
          <p>
            Quer algo especial? Personalize do seu jeito! Escolha sabores,
            quantidades e qualquer detalhe extra para deixar tudo perfeito.
          </p>
        </div>

        <div id="step">
          <h2>
            <span>3</span>SOLICITE<em>SEU ORÇAMENTO</em>
          </h2>
          <p>
            Revise sua escolha e envie seu pedido para orçamento. Nossa equipe
            entrará em contato para confirmar os detalhes e garantir que tudo
            saia do jeito que você imaginou!
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;
