// Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import logo from "../../assets/images/logo2.png";
import "./Header.css";

const Header = ({ nome, setNome }) => {
  const [buttonPopup, setButtonPopUp] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const userMenuRef = useRef(null);
  const loginPopupRef = useRef(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");
    

    if (token && idUsuario) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/Usuario/${idUsuario}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setNome(userData.nome);
          setTipoUsuario(userData.tipo);
          localStorage.setItem("nome", userData.nome);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setNome(null);
    setTipoUsuario(null);
    setUserMenuOpen(false);
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleMyOrders = () => {
    navigate("/meus-pedidos");
    setUserMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonPopup &&
        loginPopupRef.current &&
        !loginPopupRef.current.contains(event.target)
      ) {
        setButtonPopUp(false);
      }
    };

    if (buttonPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonPopup]);

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
                <div className="user-menu" ref={userMenuRef}>
                  <a onClick={handleMyOrders}>Ver meus pedidos</a>
                  {tipoUsuario === "1" && (
                    <a
                      onClick={() => {
                        navigate("/administrador");
                        setUserMenuOpen(false);
                      }}
                    >
                      Admin board
                    </a>
                  )}
                  <a onClick={handleLogout}>Logout</a>
                </div>
              )}
            </div>
          ) : (
            <>
              <a onClick={() => setButtonPopUp((prev) => !prev)} className="Login">
                Login
              </a>
              <Login
                trigger={buttonPopup}
                setTrigger={setButtonPopUp}
                setNome={setNome}
                ref={loginPopupRef}
                onLoginSuccess={fetchUserData}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
