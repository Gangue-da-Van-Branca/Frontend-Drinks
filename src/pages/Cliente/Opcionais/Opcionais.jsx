import React, { useState, useEffect } from "react";
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

  const [baresData, setBaresData] = useState([]);
  const [shotsData, setShotsData] = useState([]);
  const [extrasData, setExtrasData] = useState([]);

  const [barSelecionado, setBarSelecionado] = useState([]);
  const [shots, setShots] = useState({});
  const [extras, setExtras] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/Item")
      .then((res) => res.json())
      .then((data) => {
        // Separar por tipo
        const bares = data.filter(item => item.tipo === "Bar");
        const shots = data.filter(item => item.tipo === "Shot");
        const extras = data.filter(item => item.tipo === "Opcional");

        setBaresData(bares);
        setShotsData(shots);
        setExtrasData(extras);

        // Inicializar shots e extras como { [idItem]: quantidade }
        const shotsInicial = {};
        shots.forEach((item) => {
          shotsInicial[item.idItem] = 0;
        });
        setShots(shotsInicial);

        const extrasInicial = {};
        extras.forEach((item) => {
          extrasInicial[item.idItem] = 0;
        });
        setExtras(extrasInicial);
      })
      .catch((err) => console.error("Erro ao buscar opcionais:", err));
  }, []);

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
        bares={baresData}
        barSelecionado={barSelecionado}
        setBarSelecionado={setBarSelecionado}
      />
      <ShotsOpcionais
        shotsData={shotsData}
        shots={shots}
        setShots={setShots}
      />
      <ExtrasOpcionais
        extrasData={extrasData}
        extras={extras}
        setExtras={setExtras}
      />
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
