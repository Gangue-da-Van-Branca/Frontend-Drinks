import React from "react";
import TopoPacotes from "../../../components/PacotesPage/TopoPacotes/TopoPacotes";
import Card from "../../../components/PacotesPage/CardPacotes/CardPacotes";
import "./Pacotes.css";

function Pacotes() {
  return (
    <div>
      <TopoPacotes />
      <div className="container-cards">
        <Card evento="Casamento" preco="1234,00" />
        <Card evento="Aniversário" preco="1000,00" />
        <Card evento="Casamento" preco="1234,00" />
        <Card evento="Aniversário" preco="1000,00" />
        <Card evento="Casamento" preco="1234,00" />
        <Card evento="Aniversário" preco="1000,00" />
        <Card evento="Casamento" preco="1234,00" />
        <Card evento="Aniversário" preco="1000,00" />
      </div>
    </div>
  );
}

export default Pacotes;
