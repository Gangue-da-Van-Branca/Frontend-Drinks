import React, {useEffect} from "react";
import "./Header.css";

const Header = () => {

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 150) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
