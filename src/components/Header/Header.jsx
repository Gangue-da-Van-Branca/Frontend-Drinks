import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import logo from "../../assets/images/logo2.png";
import "./Header.css";

const Header = () => {
  const [buttonPopup, setButtonPopUp] = useState(false);
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
          <img src={logo} id="logo-img" />
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#quem-somos">Quem Somos</a></li>
            <li><a href="#como-funciona">Como Funciona</a></li>
            <li><a href="#escolha-pacote">Pacotes</a></li>
            <li><a href="#personalizacao">Personalizar</a></li>
          </ul>
        </nav>
        <div className="login-icon">
          <a onClick={() => setButtonPopUp(true)} className="Login">Login</a>
          <Login trigger={buttonPopup} setTrigger={setButtonPopUp} />
        </div>
      </div>
    </header>
  );
};

export default Header;
