import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import logo from "../../assets/images/logo2.png";
import "./Header.css";

const Header = ({ nome, setNome }) => {
  const [buttonPopup, setButtonPopUp] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");

      if (token && idUsuario && !nome) {  // só busca se não tiver nome
        try {
          const response = await fetch(`http://localhost:8080/Usuario/${idUsuario}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setNome(userData.nome);
          }
        } catch (error) {
          console.error("Erro:", error);
        }
      }
    };

    fetchUserName();
  }, [nome, setNome]);

  const handleLogout = () => {
    localStorage.clear();
    setNome(null);
  };

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
          {nome ? (
            <>
              <span>Olá, {nome}!</span>
              <a onClick={handleLogout} className="Logout">Logout</a>
            </>
          ) : (
            <>
              <a onClick={() => setButtonPopUp(true)} className="Login">Login</a>
              <Login trigger={buttonPopup} setTrigger={setButtonPopUp} setNome={setNome} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
