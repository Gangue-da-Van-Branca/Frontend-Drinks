import "./BotaoPacotesPersonalizar.css";
import { useNavigate } from "react-router-dom";

function BotaoPersonalizar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/basedrinks");
  };

  return <div className="botao-personalizar" onClick={handleClick}>PERSONALIZAR MEU PACOTE</div>;
}

export default BotaoPersonalizar;
