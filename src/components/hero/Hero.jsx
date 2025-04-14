import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="inicio">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>
          O SEU DRINK
          <br />
          EM NOSSAS MÃOS
        </h1>
        <a href="#quem-somos" className="btn-saiba-mais">
          SAIBA MAIS →
        </a>
      </div>
     
    </section>
  );
};

export default Hero;
