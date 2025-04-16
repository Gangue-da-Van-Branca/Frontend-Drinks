import React from "react";
import "./SecaoPersonalizar.css";

const SecaoPersonalizar = () => {
  return (
    <section className="personalizacao" id="personalizacao">
      <div className="titlePersonalizacao">
        <h1>Personalização</h1>
        <p>ELO DRINKS</p>
      </div>
      <div className="teste">
        <div className="box-esq"></div>
      </div>

      <div id="steps">
        <div id="step">
          <h2>
            <img src="src/assets/images/ex_bar.jpg" />
            ESCOLHA SEUS<em>SABORES</em>
          </h2>
          <p>
            Prefere algo doce, cítrico ou mais forte? Selecione os drinks que
            mais combinam com o seu evento e o paladar dos seus convidados!
          </p>
        </div>

        <div id="step">
          <h2>
            <img src="src/assets/images/casamento.jpg" />
            DEFINA A<em>APRESENTAÇÃO</em>
          </h2>
          <p>
            Quer os drinks em garrafinhas individuais, jarras para compartilhar
            ou algo exclusivo? Personalize a forma como serão servidos!
          </p>
        </div>

        <div id="step">
          <h2>
            <img src="src/assets/images/bartender3.jpg" />
            ADICIONE UM<em>TOQUE ESPECIAL</em>
          </h2>
          <p>
            Que tal um detalhe extra? Adicione frutas, especiarias ou até mesmo
            uma identidade visual especial para tornar tudo único!
          </p>
        </div>
      </div>

    </section>
  );
};

export default SecaoPersonalizar;
