import React from "react";
import TopoPacotes from "../../../components/PacotesPage/TopoPacotes/TopoPacotes";
import Card from "../../../components/PacotesPage/CardPacotes/CardPacotes";
import BotaoPersonalizar from "../../../components/PacotesPage/BotaoPacotesPersonalizar/BotaoPacotesPersonalizar";
import Footer from "../../../components/Footer/Footer";

import "./Pacotes.css";

function Pacotes() {
  return (
    <div>
      <TopoPacotes />
      <div className="container-cards">
        <Card evento="Casamento" preco="1234,00" />
        <Card evento="Lançamento" preco="1000,00" />
        <Card evento="Evento Corporativo" preco="1234,00" />
        <Card evento="Debutante" preco="1000,00" />
        <Card evento="Festa Teen" preco="1234,00" />
        <Card evento="Aniversário" preco="1000,00" />
      </div>
      <BotaoPersonalizar />
      <Footer />
    </div>
  );
}

export default Pacotes;
