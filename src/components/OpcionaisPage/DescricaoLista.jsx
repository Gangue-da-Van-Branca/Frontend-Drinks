export default function DescricaoLista({ descricao }) {
  if (!descricao) return null;

  // eslint-disable-next-line no-unused-vars
  const linhas = descricao.split(',').map((linha, index) => linha.trim()).filter(Boolean);

  return (
    <ul>
      {linhas.map((linha, index) => (
        <li key={index}>{linha}</li>
      ))}
    </ul>
  );
}
