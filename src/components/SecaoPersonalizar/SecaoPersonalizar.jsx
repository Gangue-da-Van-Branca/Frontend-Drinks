import Elodrinks from "../Elodrinks";
import "./SecaoPersonalizar.css";
import seta from '../../assets/icons/arrow-white.svg';
import img1 from "../../assets/images/ex_bar.jpg";
import img2 from "../../assets/images/casamento.jpg";
import img3 from "../../assets/images/bartender3.jpg";

const SecaoPersonalizar = () => {
  return (
    <section className="personalizacao" id="personalizacao">
      <div className="title">
        <h1>Personalize</h1>
        <Elodrinks tam="2.5rem"></Elodrinks>
      </div>

      <div className="Subtitulo">
        <div className="box-esq"></div>
        <p>Seu Evento</p>
      </div>

      <div id="steps">
        <div id="step">
          <h2>
            <img src={img1} />
            ESCOLHA SEUS SABORES
          </h2>
          <p>
            Prefere algo doce, cítrico ou mais forte? Selecione os drinks que
            mais combinam com o seu evento e o paladar dos seus convidados!
          </p>
        </div>

        <div id="step">
          <h2>
            <img src={img2} />
            DEFINA A APRESENTAÇÃO
          </h2>
          <p>
            Quer os drinks em garrafinhas individuais, jarras para compartilhar
            ou algo exclusivo? Personalize a forma como serão servidos!
          </p>
        </div>

        <div id="step">
          <h2>
            <img src={img3} />
            ADICIONE UM TOQUE ESPECIAL
          </h2>
          <p>
            Que tal um detalhe extra? Adicione frutas, especiarias ou até mesmo
            uma identidade visual especial para tornar tudo único!
          </p>
        </div>
      </div>

      <button id="personalizar-botao">
        <a href="/basedrinks" className="nunito">
          PERSONALIZAR
        </a>
        <img src={seta} alt="seta" />
      </button>
    </section>
  );
};

export default SecaoPersonalizar;
