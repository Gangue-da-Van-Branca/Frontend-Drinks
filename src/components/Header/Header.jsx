import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <img src="src/assets/images/logo2.png" id="logo-img" />
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a href="#quem-somos">Quem Somos</a>
            </li>
            <li>
              <a href="#como-funciona">Como Funciona</a>
            </li>
            <li>
              <a href="#escolha-pacote" >Pacotes</a>
            </li>
            <li>
              <a href="#personalizacao">Personalizar</a>
            </li>
          </ul>
        </nav>
        <div className="login-icon">
          <a className="Login"> Login</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
