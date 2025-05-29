import "./SecaoEscolhaPacote.css";
import Elodrinks from "../Elodrinks";
import casamentoIcon from "../../assets/icons/weddingIcon280.svg";
import maletaIcon from "../../assets/icons/maletaIcon280.svg";
import niverIcon from "../../assets/icons/giftIcon280.svg";


import seta from '../../assets/icons/arrow-up-right.svg'

const SecaoEscolhaPacote = () => {
  return (
    <section className="escolha-pacote">
    <div className="escolha-pacote-overlay">
      <div className="title">
        <h1 id="escolha-pacote">Escolha</h1>
        <Elodrinks tam="2.5rem" cor="var(--white)"></Elodrinks>
      </div>

      <div className="Subtitulo">
        <div className="box-esq"></div>
        <p id="escolha-pacote" >Seu Pacote</p>
      </div>

      <div id="opcoes">
        <a className="card-slide">
          <img className="crsl-icon" src={maletaIcon} alt="Maleta" />
          <div className="rodape">
            <h1>EVENTO CORPORATIVO</h1>
            <p id="detalhes">Brinde ao sucesso com coquetéis sob medida para sua empresa</p>
          </div>
        </a>

        <a className="card-slide">
          <img className="crsl-icon" src={casamentoIcon} alt="Casamento" />
          <div className="rodape">
            <h1>CASAMENTOS</h1>
            <p id="detalhes">Celebre o amor com drinks personalizados e uma experiência única para seus convidados. Porque cada detalhe importa no seu casamento.</p>
          </div>
        </a>

        <a className="card-slide">
          <img className="crsl-icon" src={niverIcon} alt="Aniversário" />
          <div className="rodape">
            <h1>ANIVERSÁRIOS</h1>
            <p id="detalhes">De drinks clássicos a criações exclusivas, tornamos sua festa inesquecível com sabores que combinam com você.</p>
          </div>
        </a>
      </div>

      <button id="pacote-botao">
        <a href="/pacotes" className="nunito">
          Ver todos os pacotes
        </a>
        <img src={seta} alt="seta" />
      </button>
      </div>
    </section>
  );
};

export default SecaoEscolhaPacote;
