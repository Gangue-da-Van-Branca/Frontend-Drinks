import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span>ELO</span>
        <span>DRINKS</span>
      </div>

      <nav className="nav">
        <ul>
          <li><a href="#quem-somos">QUEM SOMOS</a></li>
          <li><a href="#pacotes">PACOTES</a></li>
          <li><a href="#personalizar">PERSONALIZAR</a></li>
          <li><a href="#como-funciona">COMO FUNCIONA</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
