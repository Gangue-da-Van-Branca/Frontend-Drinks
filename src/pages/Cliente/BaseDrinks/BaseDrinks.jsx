import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TipoFesta from "../../../components/BaseDrinksPage/TipoFesta/TipoFesta";
import SelecioneDrinks from "../../../components/BaseDrinksPage/SelecioneDrinks/SelecioneDrinks";
import TopoDrinks from "../../../components/BaseDrinksPage/TopoDrinks/TopoDrinks";
import Footer from "../../../components/Footer/Footer";
import "./BaseDrinks.css";

const drinksDisponiveis = [
  {
    categoria: "Drinks Alcoólicos",
    drinks: [
      {
        id: 1,
        nome: "MOSCOW MULE",
        descricao:
          "Vodka, xarope de gengibre, limão taiti e espuma de gengibre",
      },
      {
        id: 2,
        nome: "FITZGERALD",
        descricao:
          "Gin, syrup de açúcar, suco de limão siciliano, angostura bitters e zest",
      },
      {
        id: 3,
        nome: "PENICILIN",
        descricao:
          "Whisky, suco de limão siciliano, xarope de gengibre e scotch defumado",
      },
      {
        id: 4,
        nome: "BASIL SMASH",
        descricao:
          "Gin, suco de limão siciliano, syrup de manjericão e folhas de manjericão",
      },
      {
        id: 5,
        nome: "CLASSIC TONIC",
        descricao: "Gin, limão siciliano e tônica",
      },
      {
        id: 6,
        nome: "PARADISE",
        descricao:
          "Vodka, água de coco, syrup de baunilha e raspas de coco desidratado",
      },
      {
        id: 7,
        nome: "APEROL SPRITZ",
        descricao: "Aperol, espumante, água com gás e laranja",
      },
      {
        id: 8,
        nome: "NEGRONI TWIST",
        descricao: "Gin, vermute rosso, Campari e zest de laranja bahia",
      },
      {
        id: 9,
        nome: "SPICY PASSION",
        descricao:
          "Vodka, maracujá, syrup de pimenta dedo-de-moça e limão taiti",
      },
      {
        id: 10,
        nome: "CUCUMBER FIZZ",
        descricao:
          "Gin, pepino, suco de limão siciliano, syrup de hortelã e água tônica",
      },
      {
        id: 11,
        nome: "MARGARITA",
        descricao: "Tequila, Cointreau, suco de limão taiti e borda de sal",
      },
      {
        id: 12,
        nome: "DAIQUIRI CLÁSSICO",
        descricao: "Rum branco, suco de limão taiti e xarope de açúcar",
      },
    ],
  },
  {
    categoria: "Soft Drinks (não alcoólicos) - Incluso guloseimas",
    drinks: [
      {
        id: 13,
        nome: "CIRQUE BLUE",
        descricao:
          "Curacao blue, suco de blueberry, amora, mix de limão, água com gás e algodão doce ou bala de fruta",
      },
      {
        id: 14,
        nome: "PINK LEMONADE",
        descricao:
          "Mix de limão, limão siciliano, goma ou gás e syrup de morango servido em tacinhas ou limonadas brilhantes",
      },
      {
        id: 15,
        nome: "PIÑA DESCALADA",
        descricao:
          "Suco de abacaxi, leite de coco, leite condensado e granulados coloridos",
      },
      {
        id: 16,
        nome: "LICHAI PARADISSE",
        descricao:
          "Água com gás, morangos simples, lichia, suco de limão e hortelã",
      },
      {
        id: 17,
        nome: "CLASSIC TONIC",
        descricao: "Limão siciliano, xarope e tônica",
      },
    ],
  },
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
    if (!tipoSelecionado || tipoSelecionado.trim() === "") {
      alert("Selecione o tipo de festa.");
      return;
    }
    if (
      tipoSelecionado === "Outro" &&
      (!outroTipo || outroTipo.trim() === "")
    ) {
      alert("Por favor, preencha o campo com o tipo de festa.");
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
      <TopoDrinks />
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
