import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import "./CardPacotes.css";

function Card({ evento, preco, drinks, foto }) {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();
  const { atualizarBase } = useOrcamento();

  const selecionarPacote = () => {
    // Atualiza o contexto com os dados do pacote
    atualizarBase({
      tipoFesta: evento,
      drinksSelecionados: drinks,
    });

    // Navega direto para opcionais quando vem de um pacote
    navigate("/opcionais", {
      state: { 
        tipoFesta: evento, 
        drinksSelecionados: drinks,
        fromPackage: true // Flag para indicar que veio de um pacote
      },
    });
  };

  return (
    <div className={`card-outer ${flipped ? "is-flipped" : ""}`}>
      <div className="container-card card-inner">
        {/* Frente */}
        <div
          className="card-face card-front"
          style={{ backgroundImage: `url(${foto})` }}
        >
          <div className="overlay" />
          <div className="content">
            <h1>{evento}</h1>
            <hr />
            <div className="container-price">
              <p>R$ </p>
              <p>{preco}</p>
            </div>
            <div
              className="botao-detalhes"
              onClick={() => setFlipped(true)}
            >
              Ver Detalhes
            </div>
          </div>
        </div>

        {/* Verso */}
        <div className="card-face card-back">
          <div id="title" className="title-row">
            <h1>{evento}</h1>
            <p className="fechar" onClick={() => setFlipped(false)}>X</p>
            <hr />
          </div>

          <p>
            <strong>Preço:</strong> R$ {preco}
          </p>

          <h3>Drinks inclusos</h3>
          <ul>
            {drinks.length > 0 ? (
              drinks.map((drink) => (
                <li key={drink.idItem}>
                  <strong>{drink.nome}</strong> — {drink.descricao}
                </li>
              ))
            ) : (
              <li>Nenhum drink disponível para esta categoria.</li>
            )}
          </ul>
          <button className="botao-detalhes" onClick={selecionarPacote}>
            Selecionar Pacote
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
