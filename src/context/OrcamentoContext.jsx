import { createContext, useContext, useState } from "react";

const OrcamentoContext = createContext();

export const OrcamentoProvider = ({ children }) => {
  const [orcamento, setOrcamento] = useState({
    baseFesta: {},
    opcionais: {
      shots: {},
      extras: {},
      baresAdicionais: [],
    },
    infosContratante: {}
  });

  const atualizarBase = (dados) => {
    setOrcamento((prev) => ({ ...prev, baseFesta: dados }));
  };

  const atualizarOpcionais = (dados) => {
    setOrcamento((prev) => ({ ...prev, opcionais: dados }));
  };

  const atualizarContratante = (dados) => {
    setOrcamento((prev) => ({ ...prev, infosContratante: dados }));
  };

  const resetarOrcamento = () => {
    setOrcamento({
      baseFesta: {},
      opcionais: { shots: {}, extras: {}, baresAdicionais: [] },
      infosContratante: {}
    });
  };

  return (
    <OrcamentoContext.Provider
      value={{
        orcamento,
        atualizarBase,
        atualizarOpcionais,
        atualizarContratante,
        resetarOrcamento,
      }}
    >
      {children}
    </OrcamentoContext.Provider>
  );
};

export const useOrcamento = () => useContext(OrcamentoContext);
