import "./ComoFunciona.css";
import Elodrinks from "../Elodrinks";
import seta from '../../assets/icons/arrow-white.svg'
import { useNavigate } from "react-router-dom";

const ComoFunciona = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/pacotes");
  };

  return (
    <section className="como-funciona" id="como-funciona">
      <div className="title">
        <h1>Como</h1>
        <Elodrinks tam="2.5rem"></Elodrinks>
      </div>
      <div className="Subtitulo">
        <div className="box-esq"></div>
        <p>Funciona</p>
      </div>

      <div id="passos">
        <div id="passo">
          <h2>1</h2>
          <div id="passo-title">
            <p>Escolha</p>
            <p>Seu Pacote</p>
          </div>
          <p>
            Nossos pacotes já vêm prontos para você aproveitar sem preocupação.
            Escolha o combo que mais combina com o seu evento e prepare-se para
            brindar.
          </p>
          <div id="espaco"></div>
          <div id="espaco"></div>
          <button onClick={handleClick}>Escolher Pacote ➔</button>
        </div>

        <div id="passo">
          <div id="espaco"></div>
          <h2>2</h2>
          <div id="passo-title">
            <p>Adicione</p>
            <p>Suas Ideias</p>
          </div>
          <p>
            Quer algo especial? Personalize do seu jeito! Escolha sabores, quantidades e qualquer detalhe extra para deixar tudo perfeito.
          </p>
          <div id="espaco"></div>
        </div>

        <div id="passo">
          <div id="espaco"></div>
          <div id="espaco"></div>
          <h2>3</h2>
          <div id="passo-title">
            <p>Solicite</p>
            <p>Seu Orçamento</p>
          </div>
          <p>
            Revise sua escolha e envie seu pedido para orçamento. Nossa equipe entrará em contato para confirmar os detalhes e garantir que tudo saia do jeito que você imaginou!
          </p>
        </div>
      </div>

       <button id="passo-botao">
            <a href="#quem-somos" className="nunito">Escolher Pacote</a>
            <img src={seta} alt="seta" />
        </button>

    </section>
  );
};

export default ComoFunciona;
