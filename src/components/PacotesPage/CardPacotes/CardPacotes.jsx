import { useNavigate } from "react-router-dom";
import "./CardPacotes.css";

function Card({ evento, preco, index, modalAbertoIndex, setModalAbertoIndex, drinks}) {
  const navigate = useNavigate();
  const estaAberto = modalAbertoIndex === index;

  const abrirModal = () => setModalAbertoIndex(index);
  const fecharModal = () => setModalAbertoIndex(null);

  const selecionarPacote = () => {
    fecharModal();

    navigate("/basedrinks", { state: { tipoFesta: evento, drinksSelecionados: drinks, } });
  };


  return (
    <>
      <div className="container-card">
        <h1>{evento}</h1>
        <hr />
        <div className="container-price">
          <p>R$</p>
          <p>{preco}</p>
        </div>
        <div className="botao-detalhes" onClick={abrirModal}>
          Ver Detalhes
        </div>
      </div>

      {estaAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{evento}</h2>
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

            <h3>Bares</h3>
            <ul>
              <li>Bar Temático Tropical</li>
            </ul>

            <div className="botoes-modal">
              <button onClick={selecionarPacote}>Selecionar Pacote</button>
              <button onClick={fecharModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
