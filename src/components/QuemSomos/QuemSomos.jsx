import React from "react";
import "./QuemSomos.css";

const QuemSomos = () => {
  return (
    <section className="quem-somos" id="quem-somos">
      <div className="title">
        <h1>Sobre</h1>
        <p>Perfeccionismo aos detalhes, qualidade e amor pela arte de servir</p>
      </div>
      <div className="teste">
        <div className="box-esq"></div>
        <p>
        ELO DRINKS
        </p>
        <div className="line-top"></div>
      </div>

      <div className="container">
        <div className="quem-somos-info">
          <p>
            A Elo Drinks é especializada em serviços de coquetelaria para
            eventos sociais e eventos corporativos. Hoje ela vem sendo
            reconhecida no mercado de eventos corporativos e de wedding por
            indicações dos melhores assessores, decoradores e espaço de eventos
            da Grande São Paulo por terem ótimos profissionais e um excelente
            atendimento.
          </p>
          <img id="img-left" src="src/assets/images/ex_festa7.jpg" />
        </div>

        <div className="quem-somos-info">
          <img id="img-center" src="src/assets/images/bartender2.jpg" />
          <p id="meio">
            As personalizações dos drinks são um diferencial a parte, pois traz
            um toque especial no olhar e para o paladar dos convidados, como bar
            de whiskeria com esfera em gelo, gelo com rosa, barra de gelo com
            orquídea, shots na pista, espuma artesanal com a logomarca do
            cliente estampado, bolha de fumaça e entre outras novidades que vão
            surpreender seus convidados.
          </p>
          <div className="line-img-center"></div>

        </div>

        <div className="quem-somos-info">
          <p>
            Toda a estrutura e profissionais da empresa são para oferecer a
            solução completa para cada evento, todo os profissionais são
            treinados periodicamente e capacitados para garantir excelência no
            atendimento, com drinks inovadores, com ingredientes artesanais e
            diversão à seus convidados.{" "}
          </p>
          <img id="img-right" src="src/assets/images/ex_festa4.jpg" />
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;
