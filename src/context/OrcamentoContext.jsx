import { createContext, useContext, useState } from "react";

const OrcamentoContext = createContext();

const orcamentoInicial = {
  baseFesta: {},
  opcionais: {
    shots: {},
    extras: {},
    baresAdicionais: [],
  },
  dadosOpcionais: {
    baresData: [],
    shotsData: [],
    extrasData: [],
  },
  infosContratante: {
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
    data: "",
    endereco: "",
    horarioInicio: "",
    horarioFinal: "",
    cep: "",
    convidados: "",
  },
  preco: 0,
};

export const OrcamentoProvider = ({ children }) => {
  const [orcamento, setOrcamento] = useState(orcamentoInicial);

  const atualizarBase = (dados) => {
    setOrcamento((prev) => ({ ...prev, baseFesta: dados }));
  };

  const atualizarOpcionais = (dados) => {
    setOrcamento((prev) => ({ ...prev, opcionais: dados }));
  };

  const atualizarContratante = (dados) => {
    setOrcamento((prev) => ({ ...prev, infosContratante: dados }));
  };

  const atualizarPreco = (preco) => {
    setOrcamento((prev) => ({ ...prev, preco }));
  };

  const resetarOrcamento = () => {
    setOrcamento(orcamentoInicial);
  };

  const atualizarDadosOpcionais = (dados) => {
    setOrcamento((prev) => ({ ...prev, dadosOpcionais: dados }));
  };

  return (
    <OrcamentoContext.Provider
      value={{
        orcamento,
        atualizarBase,
        atualizarOpcionais,
        atualizarDadosOpcionais,
        atualizarContratante,
        atualizarPreco,
        resetarOrcamento,
      }}
    >
      {children}
    </OrcamentoContext.Provider>
  );
};

export const useOrcamento = () => useContext(OrcamentoContext);
