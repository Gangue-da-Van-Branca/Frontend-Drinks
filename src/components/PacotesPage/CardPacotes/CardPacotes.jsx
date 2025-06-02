import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CardPacotes.css";

function Card({ evento, preco, index, drinks, foto }) {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const selecionarPacote = () => {
    navigate("/basedrinks", {
      state: { tipoFesta: evento, drinksSelecionados: drinks},
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
                <li key={drink.id}>
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
