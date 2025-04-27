import React from "react";
import "./Hero.css";
import Carrossel from "../Carrossel/Carrossel";
import seta from '../../assets/icons/arrow-up-right.svg'

const Hero = () => {
  return (
    <section className="hero" id="inicio">
    <div className="hero-overlay">
      <div className="hero-content">
        <h1>
          O SEU DRINK
          <br />
          EM NOSSAS MÃOS
        </h1>
        <button>
          <a href="#quem-somos" className="nunito">SAIBA MAIS</a>
          <img src={seta} alt="seta" />
        </button>
      </div>
  
      <div className="hero-carrossel">
        <Carrossel/>
      </div>
    </div>
  </section>
  );
};

export default Hero;
