function Elodrinks({ cor, tam }) {
  const estilo = {
    color: cor,
    fontSize: tam,
    letterSpacing: '-1px',
  };

  return <p style={estilo}>ELO DRINKS</p>;
}

export default Elodrinks;
