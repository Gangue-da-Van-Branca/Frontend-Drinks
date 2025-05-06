import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TipoFesta from "../../../components/BaseDrinksPage/TipoFesta/TipoFesta";
import SelecioneDrinks from "../../../components/BaseDrinksPage/SelecioneDrinks/SelecioneDrinks";
import TopoDrinks from "../../../components/BaseDrinksPage/TopoDrinks/TopoDrinks";
import "./BaseDrinks.css";

const drinksDisponiveis = [
  { nome: "Mojito", descricao: "Rum, hortelã e limão" },
  { nome: "Caiprinha", descricao: "Cachaça, limão e açucar" },
  { nome: "Sex on the beach", descricao: "Vodka, pêssego e laranja" },
  { nome: "Sex on the beac", descricao: "Vodka, pêssego e laranja" },
  { nome: "Sex on the beah", descricao: "Vodka, pêssego e laranja" },
  { nome: "Sex on the bech", descricao: "Vodka, pêssego e laranja" },
  { nome: "Sex on the bach", descricao: "Vodka, pêssego e laranja" },
  { nome: "Sex on the each", descricao: "Vodka, pêssego e laranja" },
  { nome: "Sex on thbeach", descricao: "Vodka, pêssego e laranja" },
];

function BaseDrinks() {
  const navigate = useNavigate();
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [outroTipo, setOutroTipo] = useState("");
  const [drinksSelecionados, setDrinksSelecionados] = useState([]);

  const toggleDrink = (drink) => {
    if (drinksSelecionados.includes(drink)) {
      setDrinksSelecionados(drinksSelecionados.filter((d) => d !== drink));
    } else if (drinksSelecionados.length < 8) {
      setDrinksSelecionados([...drinksSelecionados, drink]);
    }
  };

  const handleAvancar = () => {
    if (drinksSelecionados.length < 5) {
      alert("Selecione ao menos 5 drinks.");
      return;
    }
    const tipoFinal = tipoSelecionado === "Outro" ? outroTipo : tipoSelecionado;
    navigate("/opcionais", {
      state: {
        TipoFesta: tipoFinal,
        drinksSelecionados,
      },
    });
  };

  return (
    <div id="pagina-base-festa">
      <TopoDrinks/>
      <TipoFesta
        tipoSelecionado={tipoSelecionado}
        setTipoSelecionado={setTipoSelecionado}
        outroTipo={outroTipo}
        setOutroTipo={setOutroTipo}
      />

      <SelecioneDrinks
        drinksDisponiveis={drinksDisponiveis}
        drinksSelecionados={drinksSelecionados}
        toggleDrink={toggleDrink}
      />

      <button id="botao-avancar" onClick={handleAvancar}>
        Avançar
      </button>
    </div>
  );
}

export default BaseDrinks;
