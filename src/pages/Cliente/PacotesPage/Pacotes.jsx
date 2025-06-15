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
  const [modalAbertoIndex, setModalAbertoIndex] = useState(null);
  const [pacotesComDrinks, setPacotesComDrinks] = useState([]);

  const pacotes = [
    {
      evento: "Casamento",
      preco: "10000,00",
      drinks: [
        "i1yAp0eCcDLNPgEv2t",
        "i1OMQI4VbYTzKhgk72",
        "i1oqVEF45n5GtvNi7H",
        "i1cXa725zAv9IHx78s",
        "i1g6y8eLob9QGZJjE1",
        "i1H6dhQYql8jcb6nNf",
        "i17R3SuHESlsNccJ97",
        "i1vCWQEQXxersroTVf",
      ],
      foto: casamentoTime,
    },
    {
      evento: "Evento de Lançamento",
      preco: "5000,00",
      drinks: [
        "i1OMQI4VbYTzKhgk72",
        "i1uZepl4zoJIV2zcne",
        "i1oqVEF45n5GtvNi7H",
        "i1H6dhQYql8jcb6nNf",
        "i17R3SuHESlsNccJ97",
        "i1r2FZ2OSkPaOptUU3",
        "i1Xy5Nn2uuMouEJXqh",
        "i1m0xFyJn4dQs9MQI6",
      ],
      foto: festa1,
    },
    {
      evento: "Evento Corporativo",
      preco: "7000,00",
      drinks: [
        "i1yAp0eCcDLNPgEv2t",
        "i160VCLtD6W5bszrgu",
        "i1OMQI4VbYTzKhgk72",
        "i1oqVEF45n5GtvNi7H",
        "i1m0xFyJn4dQs9MQI6",
        "i1TE7rXG2YUqWMfkhY",
        "i1vCWQEQXxersroTVf",
        "i1rz62dHMqSDa020XU",
      ],
      foto: festa2,
    },
    {
      evento: "Debutante",
      preco: "8000,00",
      drinks: [
        "i12PlUD9t9CLhfIiAO",
        "i179fSVduKdLX4LscD",
        "i1PTAuIHUo438hUHvc",
        "i1OMQI4VbYTzKhgk72",
        "i11LKQJlmumPn9lWih",
        "i1r2FZ2OSkPaOptUU3",
        "i1Xy5Nn2uuMouEJXqh",
        "i17R3SuHESlsNccJ97",
      ],
      foto: festa3,
    },
    {
      evento: "Festa Teen",
      preco: "3000,00",
      drinks: [
        "i11LKQJlmumPn9lWih",
        "i1Xy5Nn2uuMouEJXqh",
        "i1vCWQEQXxersroTVf",
        "i1TE7rXG2YUqWMfkhY",
        "i1rz62dHMqSDa020XU",
        "i1r2FZ2OSkPaOptUU3",
        "i1GsP4QdH4eysBOQmJ",
        "i1FGlcg0VClkJIzj9B",
      ],
      foto: festa4,
    },
    {
      evento: "Aniversário",
      preco: "5000,00",
      drinks: [
        "i179fSVduKdLX4LscD",
        "i1oqVEF45n5GtvNi7H",
        "i1OMQI4VbYTzKhgk72",
        "i1uZepl4zoJIV2zcne",
        "i12PlUD9t9CLhfIiAO",
        "i1cXa725zAv9IHx78s",
        "i1r2FZ2OSkPaOptUU3",
        "i1Xy5Nn2uuMouEJXqh",
      ],
      foto: festa5,
    },
  ];

  useEffect(() => {
    async function buscarDrinks() {
      const cacheKey = "pacotesComDrinksCache";
      const timestampKey = "pacotesComDrinksTimestamp";
      const cache = localStorage.getItem(cacheKey);
      const timestamp = localStorage.getItem(timestampKey);
      const token = localStorage.getItem("token");

      const agora = new Date().getTime();
      const tresDiasEmMs = 3 * 24 * 60 * 60 * 1000;

      if (
        cache &&
        timestamp &&
        agora - parseInt(timestamp, 10) < tresDiasEmMs
      ) {
        setPacotesComDrinks(JSON.parse(cache));
        return;
      }

      const pacotesComDados = await Promise.all(
        pacotes.map(async (pacote) => {
          const drinksDetalhados = await Promise.all(
            pacote.drinks.map(async (id) => {
              try {
                const response = await fetch(
                  `${import.meta.env.VITE_API_URL}/Item/${id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (!response.ok) throw new Error("Erro ao buscar drink");
                return await response.json();
              } catch (error) {
                console.error(`Erro com o drink ${id}:`, error);
                return { id, nome: "Drink não encontrado", descricao: "" };
              }
            })
          );
          return { ...pacote, drinks: drinksDetalhados };
        })
      );

      localStorage.setItem(cacheKey, JSON.stringify(pacotesComDados));
      localStorage.setItem(timestampKey, agora.toString());
      setPacotesComDrinks(pacotesComDados);
    }

    buscarDrinks();
  }, []);

  return (
    <div>
      <TopoPacotes />
      <div className="container-cards">
        {pacotesComDrinks.map((pacote, index) => (
          <Card
            key={index}
            index={index}
            evento={pacote.evento}
            preco={pacote.preco}
            foto={pacote.foto}
            modalAbertoIndex={modalAbertoIndex}
            setModalAbertoIndex={setModalAbertoIndex}
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
