import "./TopoDrinks.css";
import { useLocation, useNavigate } from "react-router-dom";
import voltar from "../../../assets/icons/arrow-white.svg";

const TopoDrinks = () => {
   const navigate = useNavigate();
  return (
    <header id="topo-basedrinks">
       <div id="botoes">
        <button type="submit" onClick={() => navigate("/")}>
          <img src={voltar} alt="" />
        </button>
      </div>
      <div id="logo-container-basedrinks">
        <div/>
      </div>
      <div id="linha-titulo-basedrinks">
        BASE DA FESTA
       
        <div id="linha-horizontal-basedrinks" />
        <div id="texto-basedrinks">
          <p>
            Selecione de 5 a 8 drinks autorais e clássicos, cuidadosamente
            preparados para refletir o estilo da sua celebração.{" "}
          </p>
          <p>
            A partir de R$ 3.200, oferecemos um serviço completo com estrutura
            elegante, bartenders especializados e insumos premium.
          </p>
          <p>
            Nos pacotes personalizados, a quantidade de funcionários é definida
            baseada no número de convidados da festa.
          </p>
        </div>
      </div>
    </header>
  );
};

export default TopoDrinks;
