import React from "react";
import "./TopoPacotes.css";
import Elodrinks from "../../Elodrinks";
import logo from "../../../assets/icons/logo.svg"

const TopoPacotes = () => {
  return (
    <header id="topo-pacotes">
      <div className="title">
        <h1>Escolha</h1>
        <div id="side">
        <img src={logo} alt="" />
        <Elodrinks tam="2.5rem"></Elodrinks></div>
      </div>

      <div className="Subtitulo">
        <div className="box-esq"></div>
        <p>Seu Pacote</p>
      </div>
        <div id="linha-horizontal" />
  
    </header>
  );
};

export default TopoPacotes;
