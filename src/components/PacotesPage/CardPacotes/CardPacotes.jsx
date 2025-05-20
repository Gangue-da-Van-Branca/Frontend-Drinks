import "./CardPacotes.css";

function Card({ evento, preco, index, modalAbertoIndex, setModalAbertoIndex }) {
  const estaAberto = modalAbertoIndex === index;

  const abrirModal = () => setModalAbertoIndex(index);
  const fecharModal = () => setModalAbertoIndex(null);
  const selecionarPacote = () => {
    alert(`Pacote "${evento}" selecionado!`);
    fecharModal();
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
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{evento}</h2>
            <p><strong>Preço:</strong> R$ {preco}</p>

            <h3>Drinks inclusos</h3>
            <ul>
              <li>Mojito</li>
              <li>Sex on the Beach</li>
              <li>Caipirinha</li>
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
