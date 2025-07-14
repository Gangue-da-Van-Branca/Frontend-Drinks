import React, { useState, useEffect } from "react";
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
  const [pacotesComDrinks, setPacotesComDrinks] = useState([]);

  useEffect(() => {
    // Pacotes com drinks predefinidos (sem necessidade de buscar na API)
    const pacotesComDrinks = [
      {
        evento: "Casamento",
        preco: "10000,00",
        drinks: [
          { idItem: "i1wuArJ8Ve2GHqEHDs", nome: "Fitzgerald", descricao: "Gin, syrup de açúcar, suco de limão siciliano, angostura bitters e zest", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1EHXIP80bb2sAOIzY", nome: "Negroni Twist", descricao: "Gin, vermute rosso, Campari e zest de laranja bahia", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1q8fkqRkLTLpOVStO", nome: "Margarita", descricao: "Tequila, Cointreau, suco de limão taiti e borda de sal", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1hQHuQ90azZRThJfi", nome: "Aperol Spritz", descricao: "Aperol, espumante, água com gás e laranja", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1jJV8vQcqNsdfzwLJ", nome: "Moscow Mule", descricao: "Vodka, xarope de gengibre, limão taiti e espuma de gengibre", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1AqgU7J5JBMkDoWEe", nome: "Daiquiri Clássico", descricao: "Rum branco, suco de limão taiti e xarope de açúcar", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1BVn36SzYrjWwKifA", nome: "Classic Tonic", descricao: "Limão siciliano, xarope e tônica", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1RwmVnU2cUmGUNtiM", nome: "Pink Lemonade", descricao: "Mix de limão, limão siciliano, goma ou gás e syrup de morango servido em tacinhas ou limonadas brilhantes", preco: 15, tipo: "Soft Drink" }
        ],
        foto: casamentoTime,
      },
      {
        evento: "Evento de Lançamento",
        preco: "5000,00",
        drinks: [
          { idItem: "i1hQHuQ90azZRThJfi", nome: "Aperol Spritz", descricao: "Aperol, espumante, água com gás e laranja", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1jJV8vQcqNsdfzwLJ", nome: "Moscow Mule", descricao: "Vodka, xarope de gengibre, limão taiti e espuma de gengibre", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1C6Z0ffU730PDXoJU", nome: "Cucumber Fizz", descricao: "Gin, pepino, suco de limão siciliano, syrup de hortelã e água tônica", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i121gnJwkv4nSneNYs", nome: "Spicy Passion", descricao: "Vodka, maracujá, syrup de pimenta dedo-de-moça e limão taiti", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1RXM5gc3t8I10Kxfx", nome: "Classic Tonic", descricao: "Gin, limão siciliano e tônica", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1ZTpsx0Uwt6ZEOwYb", nome: "Basil Smash", descricao: "Gin, suco de limão siciliano, syrup de manjericão e folhas de manjericão", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1mrskmGI0LDgQ15nE", nome: "Cirque Blue", descricao: "Curacao blue, suco de blueberry, amora, mix de limão, água com gás e algodão doce ou bala de fruta", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1PW8ZhenB5LoA8kiP", nome: "Piña Descalada", descricao: "Suco de abacaxi, leite de coco, leite condensado e granulados coloridos", preco: 15, tipo: "Soft Drink" }
        ],
        foto: festa1,
      },
      {
        evento: "Evento Corporativo",
        preco: "7000,00",
        drinks: [
          { idItem: "i1wuArJ8Ve2GHqEHDs", nome: "Fitzgerald", descricao: "Gin, syrup de açúcar, suco de limão siciliano, angostura bitters e zest", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1EHXIP80bb2sAOIzY", nome: "Negroni Twist", descricao: "Gin, vermute rosso, Campari e zest de laranja bahia", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i19t58SKPdejhO9qiZ", nome: "Penicilin", descricao: "Whisky, suco de limão siciliano, xarope de gengibre e scotch defumado", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1RXM5gc3t8I10Kxfx", nome: "Classic Tonic", descricao: "Gin, limão siciliano e tônica", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1hQHuQ90azZRThJfi", nome: "Aperol Spritz", descricao: "Aperol, espumante, água com gás e laranja", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1jJV8vQcqNsdfzwLJ", nome: "Moscow Mule", descricao: "Vodka, xarope de gengibre, limão taiti e espuma de gengibre", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1BVn36SzYrjWwKifA", nome: "Classic Tonic", descricao: "Limão siciliano, xarope e tônica", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1Eo7iCg7yk3vpTHkT", nome: "Lichai Paradise", descricao: "Água com gás, morangos simples, lichia, suco de limão e hortelã", preco: 15, tipo: "Soft Drink" }
        ],
        foto: festa2,
      },
      {
        evento: "Debutante",
        preco: "8000,00",
        drinks: [
          { idItem: "i1EkKzMxJk04KOnUHs", nome: "Paradise", descricao: "Vodka, água de coco, syrup de baunilha e raspas de coco desidratado", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1AqgU7J5JBMkDoWEe", nome: "Daiquiri Clássico", descricao: "Rum branco, suco de limão taiti e xarope de açúcar", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1q8fkqRkLTLpOVStO", nome: "Margarita", descricao: "Tequila, Cointreau, suco de limão taiti e borda de sal", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1hQHuQ90azZRThJfi", nome: "Aperol Spritz", descricao: "Aperol, espumante, água com gás e laranja", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i121gnJwkv4nSneNYs", nome: "Spicy Passion", descricao: "Vodka, maracujá, syrup de pimenta dedo-de-moça e limão taiti", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1RwmVnU2cUmGUNtiM", nome: "Pink Lemonade", descricao: "Mix de limão, limão siciliano, goma ou gás e syrup de morango servido em tacinhas ou limonadas brilhantes", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1mrskmGI0LDgQ15nE", nome: "Cirque Blue", descricao: "Curacao blue, suco de blueberry, amora, mix de limão, água com gás e algodão doce ou bala de fruta", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1PW8ZhenB5LoA8kiP", nome: "Piña Descalada", descricao: "Suco de abacaxi, leite de coco, leite condensado e granulados coloridos", preco: 15, tipo: "Soft Drink" }
        ],
        foto: festa3,
      },
      {
        evento: "Festa Teen",
        preco: "3000,00",
        drinks: [
          { idItem: "i1BVn36SzYrjWwKifA", nome: "Classic Tonic", descricao: "Limão siciliano, xarope e tônica", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1Eo7iCg7yk3vpTHkT", nome: "Lichai Paradise", descricao: "Água com gás, morangos simples, lichia, suco de limão e hortelã", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1mrskmGI0LDgQ15nE", nome: "Cirque Blue", descricao: "Curacao blue, suco de blueberry, amora, mix de limão, água com gás e algodão doce ou bala de fruta", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1PW8ZhenB5LoA8kiP", nome: "Piña Descalada", descricao: "Suco de abacaxi, leite de coco, leite condensado e granulados coloridos", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1RwmVnU2cUmGUNtiM", nome: "Pink Lemonade", descricao: "Mix de limão, limão siciliano, goma ou gás e syrup de morango servido em tacinhas ou limonadas brilhantes", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1hQHuQ90azZRThJfi", nome: "Aperol Spritz", descricao: "Aperol, espumante, água com gás e laranja", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1AqgU7J5JBMkDoWEe", nome: "Daiquiri Clássico", descricao: "Rum branco, suco de limão taiti e xarope de açúcar", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1C6Z0ffU730PDXoJU", nome: "Cucumber Fizz", descricao: "Gin, pepino, suco de limão siciliano, syrup de hortelã e água tônica", preco: 15, tipo: "Drink Alcoólico" }
        ],
        foto: festa4,
      },
      {
        evento: "Aniversário",
        preco: "5000,00",
        drinks: [
          { idItem: "i1AqgU7J5JBMkDoWEe", nome: "Daiquiri Clássico", descricao: "Rum branco, suco de limão taiti e xarope de açúcar", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1q8fkqRkLTLpOVStO", nome: "Margarita", descricao: "Tequila, Cointreau, suco de limão taiti e borda de sal", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1hQHuQ90azZRThJfi", nome: "Aperol Spritz", descricao: "Aperol, espumante, água com gás e laranja", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1jJV8vQcqNsdfzwLJ", nome: "Moscow Mule", descricao: "Vodka, xarope de gengibre, limão taiti e espuma de gengibre", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1C6Z0ffU730PDXoJU", nome: "Cucumber Fizz", descricao: "Gin, pepino, suco de limão siciliano, syrup de hortelã e água tônica", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1ZTpsx0Uwt6ZEOwYb", nome: "Basil Smash", descricao: "Gin, suco de limão siciliano, syrup de manjericão e folhas de manjericão", preco: 15, tipo: "Drink Alcoólico" },
          { idItem: "i1RwmVnU2cUmGUNtiM", nome: "Pink Lemonade", descricao: "Mix de limão, limão siciliano, goma ou gás e syrup de morango servido em tacinhas ou limonadas brilhantes", preco: 15, tipo: "Soft Drink" },
          { idItem: "i1PW8ZhenB5LoA8kiP", nome: "Piña Descalada", descricao: "Suco de abacaxi, leite de coco, leite condensado e granulados coloridos", preco: 15, tipo: "Soft Drink" }
        ],
        foto: festa5,
      }
    ];

    // Define os pacotes diretamente sem buscar na API
    setPacotesComDrinks(pacotesComDrinks);
  }, []);

  return (
    <div>
      <TopoPacotes />
      <div className="container-cards">
        {pacotesComDrinks.map((pacote, index) => (
          <Card
            key={index}
            evento={pacote.evento}
            preco={pacote.preco}
            foto={pacote.foto}
            drinks={pacote.drinks}
          />
        ))}
      </div>
      <BotaoPersonalizar />
      <Footer />
    </div>
  );
}

export default Pacotes;
