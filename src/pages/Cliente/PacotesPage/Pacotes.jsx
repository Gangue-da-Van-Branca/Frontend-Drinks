import React, { useState } from "react";
import TopoPacotes from "../../../components/PacotesPage/TopoPacotes/TopoPacotes";
import Card from "../../../components/PacotesPage/CardPacotes/CardPacotes";
import BotaoPersonalizar from "../../../components/PacotesPage/BotaoPacotesPersonalizar/BotaoPacotesPersonalizar";
import Footer from "../../../components/Footer/Footer";
import "./Pacotes.css";

function Pacotes() {
  const [modalAbertoIndex, setModalAbertoIndex] = useState(null);

  const pacotes = [
    { evento: "Casamento", preco: "1234,00" },
    { evento: "Lançamento", preco: "1000,00" },
    { evento: "Evento Corporativo", preco: "1234,00" },
    { evento: "Debutante", preco: "1000,00" },
    { evento: "Festa Teen", preco: "1234,00" },
    { evento: "Aniversário", preco: "1000,00" },
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
            modalAbertoIndex={modalAbertoIndex}
            setModalAbertoIndex={setModalAbertoIndex}
          />
        ))}
      </div>
      <BotaoPersonalizar />
      <Footer />
    </div>
  );
}

export default Pacotes;
