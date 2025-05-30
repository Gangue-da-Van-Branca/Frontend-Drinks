import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOrcamento } from "../../../context/OrcamentoContext";

import TopoOpcionais from "../../../components/OpcionaisPage/TopoOpcionais/TopoOpcionais";
import BaresOpcionais from "../../../components/OpcionaisPage/BaresOpcionais/BaresOpcionais";
import ShotsOpcionais from "../../../components/OpcionaisPage/ShotsOpcionais/ShotsNaPista";
import ExtrasOpcionais from "../../../components/OpcionaisPage/ExtrasOpcionais/ExtrasOpcionais";
import Footer from "../../../components/Footer/Footer";

function Opcionais() {
  const navigate = useNavigate();
  const { atualizarOpcionais } = useOrcamento();

  const [barSelecionado, setBarSelecionado] = useState([]);

  const [shots, setShots] = useState({
    "Mini Beer (Licor 43) com espuma": 0,
    "Tequila de café em copinhos de chocolate": 0,
    "Mini milk-shakes de Oreo": 0,
    "Jagermeister em tubos de ensaio": 0,
  });

  const [extras, setExtras] = useState({
    "Cerveja Stella Artois ou Heineken 250 ml": 0,
    "Whisky Black Label": 0,
    "Whisky Johnnie Walker Red Label": 0,
    "Espumante Freixenet Brut": 0,
    "Espumante Salton Brut": 0,
    "Drink na Lâmpada": 0,
  });

  const handleAvancar = () => {
    const hasShotSelecionado = Object.values(shots).some((qtd) => qtd > 0);
    const hasExtraSelecionado = Object.values(extras).some((qtd) => qtd > 0);

    atualizarOpcionais({
      shots,
      extras,
      baresAdicionais: barSelecionado,
    });

    if (
      barSelecionado.length === 0 &&
      !hasShotSelecionado &&
      !hasExtraSelecionado
    ) {
      alert("Selecione pelo menos uma opção de bar, shot ou extra.");
      return;
    }

    navigate("/infosContratante");
  };

  return (
    <div>
      <TopoOpcionais />
      <BaresOpcionais
        barSelecionado={barSelecionado}
        setBarSelecionado={setBarSelecionado}
      />
      <ShotsOpcionais shots={shots} setShots={setShots} />
      <ExtrasOpcionais extras={extras} setExtras={setExtras} />
      <div className="container-botao" style={{ marginBottom: 60 }}>
        <button id="botao-avancar" onClick={handleAvancar}>
          Avançar
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Opcionais;
