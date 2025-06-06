import React, { useState } from "react";
import TopoPacotes from "../../../components/PacotesPage/TopoPacotes/TopoPacotes";
import Card from "../../../components/PacotesPage/CardPacotes/CardPacotes";
import BotaoPersonalizar from "../../../components/PacotesPage/BotaoPacotesPersonalizar/BotaoPacotesPersonalizar";
import Footer from "../../../components/Footer/Footer";
import casamentoTime from "../../../assets/images/casamento.jpg";
import festa1 from "../../../assets/images/ex_festa.jpg";
import festa2 from "../../../assets/images/ex_festa5.jpg";
import festa3 from "../../../assets/images/ex_festa2.jpg";
import festa4 from "../../../assets/images/ex_festa3.jpg";
import festa5 from "../../../assets/images/ex_festa4.jpg";
import "./Pacotes.css";

function Pacotes() {
  const [modalAbertoIndex, setModalAbertoIndex] = useState(null);

  const pacotes = [
    { evento: "Casamento", preco: "1234,00", drinks: ["adbjsdba", "adbjsdbaa", "adbjsdbappp", "adbjsdbavvvv", "adbjsdballl"],foto: casamentoTime },
    { evento: "Lançamento", preco: "1000,00", drinks: ["adbjsdba", "adbjsdbaa", "adbjsdbappp", "adbjsdbavvvv", "adbjsdballl"], foto: festa1  },
    { evento: "Evento Corporativo", preco: "1234,00", drinks: ["adbjsdba", "adbjsdbaa", "adbjsdbappp", "adbjsdbavvvv", "adbjsdballl"], foto: festa2},
    { evento: "Debutante", preco: "1000,00", drinks: ["adbjsdba", "adbjsdbaa", "adbjsdbappp", "adbjsdbavvvv", "adbjsdballl"], foto: festa3 },
    { evento: "Festa Teen", preco: "1234,00", drinks: ["adbjsdba", "adbjsdbaa", "adbjsdbappp", "adbjsdbavvvv", "adbjsdballl"], foto: festa4 },
    { evento: "Aniversário", preco: "1000,00", drinks: ["adbjsdba", "adbjsdbaa", "adbjsdbappp", "adbjsdbavvvv", "adbjsdballl"], foto: festa5 },
  ];

const drinksDisponiveis = [
  {
    categoria: "Drinks Alcoólicos",
    drinks: [
      {
        id: "adbjsdba",
        nome: "MOSCOW MULE",
        descricao:
          "Vodka, xarope de gengibre, limão taiti e espuma de gengibre",
      },
      {
        id: "adbjsdbaa",
        nome: "FITZGERALD",
        descricao:
          "Gin, syrup de açúcar, suco de limão siciliano, angostura bitters e zest",
      },
      {
        id: "adbjsdbappp",
        nome: "PENICILIN",
        descricao:
          "Whisky, suco de limão siciliano, xarope de gengibre e scotch defumado",
      },
      {
        id: "adbjsdbavvvv",
        nome: "BASIL SMASH",
        descricao:
          "Gin, suco de limão siciliano, syrup de manjericão e folhas de manjericão",
      },
      {
        id: "adbjsdbaddd",
        nome: "CLASSIC TONIC",
        descricao: "Gin, limão siciliano e tônica",
      },
      {
        id: "adbjsdballl",
        nome: "PARADISE",
        descricao:
          "Vodka, água de coco, syrup de baunilha e raspas de coco desidratado",
      },
      {
        id: "adbjsdbaqweer",
        nome: "APEROL SPRITZ",
        descricao: "Aperol, espumante, água com gás e laranja",
      },
      {
        id: "adbjsdbasss",
        nome: "NEGRONI TWIST",
        descricao: "Gin, vermute rosso, Campari e zest de laranja bahia",
      },
      {
        id: "adbjsdbaplanbd",
        nome: "SPICY PASSION",
        descricao:
          "Vodka, maracujá, syrup de pimenta dedo-de-moça e limão taiti",
      },
      {
        id: "adbjsdbadadbab",
        nome: "CUCUMBER FIZZ",
        descricao:
          "Gin, pepino, suco de limão siciliano, syrup de hortelã e água tônica",
      },
      {
        id: "adbjsdbadakjbdaqw",
        nome: "MARGARITA",
        descricao: "Tequila, Cointreau, suco de limão taiti e borda de sal",
      },
      {
        id: "adbjsdbaakjjdns",
        nome: "DAIQUIRI CLÁSSICO",
        descricao: "Rum branco, suco de limão taiti e xarope de açúcar",
      },
    ],
  },
  {
    categoria: "Soft Drinks (não alcoólicos) - Incluso guloseimas",
    drinks: [
      {
        id: "adbjsdbaaaaayyttree",
        nome: "CIRQUE BLUE",
        descricao:
          "Curacao blue, suco de blueberry, amora, mix de limão, água com gás e algodão doce ou bala de fruta",
      },
      {
        id: "adbjsdbaqpiqwwb",
        nome: "PINK LEMONADE",
        descricao:
          "Mix de limão, limão siciliano, goma ou gás e syrup de morango servido em tacinhas ou limonadas brilhantes",
      },
      {
        id: "adbjsdbaqseqewe",
        nome: "PIÑA DESCALADA",
        descricao:
          "Suco de abacaxi, leite de coco, leite condensado e granulados coloridos",
      },
      {
        id: "adbjsdbaçlasbbbbx",
        nome: "LICHAI PARADISSE",
        descricao:
          "Água com gás, morangos simples, lichia, suco de limão e hortelã",
      },
      {
        id: "adbjsdbaq5tqtw",
        nome: "CLASSIC TONIC",
        descricao: "Limão siciliano, xarope e tônica",
      },
    ],
  },
];

  return (
    <div>
      <TopoPacotes />
      <div className="container-cards">
        {pacotes.map((pacote, index) => (
          <Card
            key={index}
            index={index}
            evento={pacote.evento}
            preco={pacote.preco}
            foto={pacote.foto}
            modalAbertoIndex={modalAbertoIndex}
            setModalAbertoIndex={setModalAbertoIndex}
            drinks={pacote.drinks.map((drinkId) => {
              return drinksDisponiveis
                .flatMap((cat) => cat.drinks)
                .find((drink) => drink.id === drinkId);
            })}
          />
        ))}
      </div>
      <BotaoPersonalizar />
      <Footer />
    </div>
  );
}

export default Pacotes;
