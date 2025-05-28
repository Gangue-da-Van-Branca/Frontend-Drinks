import React, { useState } from "react";
import Login from "../Login/Login";
import logo from "../../assets/images/logo2.png";
import { Link } from "react-router-dom";
import "./HeaderSecundario.css";

const HeaderSecundario = () => {
  const [buttonPopup, setButtonPopUp] = useState(false);

  return (
    <header className="header-secundario">
      <div className="header-secundario-container">
        <div className="logo">
          <img src={logo} id="logo-img-sec" alt="Logo" />
        </div>
        <nav className="nav-secundaria">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pacotes">Pacotes</Link></li>
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

export default HeaderSecundario;
