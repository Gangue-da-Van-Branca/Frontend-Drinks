import React from "react";
import { useState } from "react";
import Header from "../../../components/Header/Header";
import QuemSomos from "../../../components/SecaoQuemSomos/QuemSomos";
import Hero from "../../../components/hero/Hero";
import ComoFunciona from "../../../components/SecaoComoFunciona/ComoFunciona";
import SecaoEscolhaPacote from "../../../components/SecaoEscolhaPacote/SecaoEscolhaPacote";
import Footer from "../../../components/Footer/Footer";
import SecaoPersonalizar from "../../../components/SecaoPersonalizar/SecaoPersonalizar";
import "../../../style/global.css";

function Home() {
  const [nome, setNome] = useState(localStorage.getItem("nome") || null);

  return (
    <div>
      <Header nome={nome} setNome={setNome} />
      <Hero />
      <QuemSomos />
      <ComoFunciona />
      <SecaoEscolhaPacote />
      <SecaoPersonalizar />
      <Footer />
    </div>
  );
}

export default Home;
