import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">EloDrinks</div>
        <nav className="nav">
          <ul>
            <li>
              <a href="#quem-somos">Quem Somos</a>
            </li>
            <li>
              <a href="#como-funciona">Como Funciona</a>
            </li>
            <li>
              <a href="#pacotes">Pacotes</a>
            </li>
            <li>
              <a href="#personalizar">Personalizar</a>
            </li>
          </ul>
        </nav>
        <div className="login-icon">
          <i className="fas fa-user"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
