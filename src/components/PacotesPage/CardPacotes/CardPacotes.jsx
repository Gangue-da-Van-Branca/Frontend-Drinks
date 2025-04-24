import "./CardPacotes.css";

function Card(props) {
  return (
    <div className="container-card">
      <h1>{props.evento}</h1>
      <hr />
      <div className="container-price">
        <p>R$ </p>
        <p>{props.preco}</p>
      </div>

      <div className="botao-detalhes">
        Ver Detalhes
      </div>
    </div>
  );
}

export default Card;
