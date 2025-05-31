import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TipoFesta from "../../../components/BaseDrinksPage/TipoFesta/TipoFesta";
import SelecioneDrinks from "../../../components/BaseDrinksPage/SelecioneDrinks/SelecioneDrinks";
import TopoDrinks from "../../../components/BaseDrinksPage/TopoDrinks/TopoDrinks";
import Footer from "../../../components/Footer/Footer";
import "./BaseDrinks.css";
import { useOrcamento } from "../../../context/OrcamentoContext";

function BaseDrinks() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tipoSelecionado, setTipoSelecionado] = useState(location.state?.tipoFesta || "");
  const [outroTipo, setOutroTipo] = useState("");
  const [drinksSelecionados, setDrinksSelecionados] = useState(location.state?.drinksSelecionados || []);
  const { atualizarBase } = useOrcamento();

  const [drinksAPI, setDrinksAPI] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch("http://localhost:8080/Item");
        const data = await response.json();
        setDrinksAPI(data);
      } catch (error) {
        console.error("Erro ao buscar drinks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  const categoriasPermitidas = ["Drink Alcólico", "Soft Drink"];
  const drinksFiltrados = drinksAPI.filter(drink => categoriasPermitidas.includes(drink.tipo));

  const toggleDrink = (drink) => {
    const isSelected = drinksSelecionados.some((d) => d.id === drink.idItem);
    if (isSelected) {
      setDrinksSelecionados(drinksSelecionados.filter((d) => d.id !== drink.idItem));
    } else if (drinksSelecionados.length < 8) {
      setDrinksSelecionados([...drinksSelecionados, drink]);
    } else {
      alert("Você só pode selecionar até 8 drinks.");
    }
  };

  const handleAvancar = () => {
    if (drinksSelecionados.length < 8) {
      alert("Selecione seus 8 drinks.");
      return;
    }
    if (!tipoSelecionado || tipoSelecionado.trim() === "") {
      alert("Selecione o tipo de festa.");
      return;
    }
    if (tipoSelecionado === "Outro" && (!outroTipo || outroTipo.trim() === "")) {
      alert("Por favor, preencha o campo com o tipo de festa.");
      return;
    }

    const tipoFinal = tipoSelecionado === "Outro" ? outroTipo : tipoSelecionado;

    atualizarBase({
      tipoFesta: tipoFinal,
      drinksSelecionados,
    });

    navigate("/opcionais", {
      state: {
        TipoFesta: tipoFinal,
        drinksSelecionados,
      },
    });
  };

  if (isLoading) {
    return <p>Carregando drinks...</p>;
  }

  return (
    <div id="pagina-base-festa">
      <TopoDrinks />
      <TipoFesta
        tipoSelecionado={tipoSelecionado}
        setTipoSelecionado={setTipoSelecionado}
        outroTipo={outroTipo}
        setOutroTipo={setOutroTipo}
      />

      <SelecioneDrinks
        drinksDisponiveis={drinksFiltrados}
        drinksSelecionados={drinksSelecionados}
        toggleDrink={toggleDrink}
      />

      <div className="container-botao">
        <button id="botao-avancar" onClick={handleAvancar}>
          Avançar
        </button>
      </div>

      <div className="footer-basedrinks">
        <Footer />
      </div>
    </div>
  );
}

export default BaseDrinks;
