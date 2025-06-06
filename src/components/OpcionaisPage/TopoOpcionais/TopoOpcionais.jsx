import { useEffect } from 'react';
import "./TopoOpcionais.css";

const TopoOpcionais = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <header id="topo-opcionais">
      <div id="logo-container-opcionais">
        <div id="barra-lateral-opcionais" />
      </div>
      <div id="linha-titulo-opcionais">
        OPCIONAIS
        <div id="linha-horizontal-opcionais" />
      </div>
    </header>
  );
};

export default TopoOpcionais;
