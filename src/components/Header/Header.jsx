import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import logo from "../../assets/images/logo2.png";
import "./Header.css";

const Header = ({ nome, setNome }) => {
  const [buttonPopup, setButtonPopUp] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();


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

      if (token && idUsuario && !nome) {
        try {
          const response = await fetch(
            `http://localhost:8080/Usuario/${idUsuario}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

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
    setUserMenuOpen(false);
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleMyOrders = () => {
    navigate("/meus-pedidos");
    setUserMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <img src={logo} id="logo-img" alt="Logo" />
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
              <a href="#escolha-pacote">Pacotes</a>
            </li>
            <li>
              <a href="#personalizacao">Personalizar</a>
            </li>
          </ul>
        </nav>
        <div className="login-icon">
          {nome ? (
            <div className="user-menu-container">
              <a onClick={handleUserMenuToggle} className="user-greeting">
                Olá, {nome}!
              </a>
              {userMenuOpen && (
                <div className="user-menu">
                  <a onClick={handleMyOrders}>Ver meus pedidos</a>
                  <a onClick={handleLogout}>Logout</a>
                </div>
              )}
            </div>
          ) : (
            <>
              <a onClick={() => setButtonPopUp(true)} className="Login">
                Login
              </a>
              <Login
                trigger={buttonPopup}
                setTrigger={setButtonPopUp}
                setNome={setNome}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
