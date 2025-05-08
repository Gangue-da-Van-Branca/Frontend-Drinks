import React from "react";
import { useNavigate } from "react-router-dom";
import TopoOpcionais from "../../../components/OpcionaisPage/TopoOpcionais/TopoOpcionais";
import BaresOpcionais from "../../../components/OpcionaisPage/BaresOpcionais/BaresOpcionais";
import ShotsOpcionais from "../../../components/OpcionaisPage/ShotsOpcionais/ShotsOpcionais";
import ExtrasOpcionais from "../../../components/OpcionaisPage/ExtrasOpcionais/ExtrasOpcionais";
import Footer from "../../../components/Footer/Footer";

function Opcionais() {
  const navigate = useNavigate();

  const handleAvancar = () => {
    navigate("/infosContratante");
  };

  return (
    <div>
      <TopoOpcionais />
      <BaresOpcionais />
      <ShotsOpcionais />
      <ExtrasOpcionais />
      <div className="container-botao" style={{marginBottom:60}}>
        <button id="botao-avancar" onClick={handleAvancar}>
          Avançar
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Opcionais;
