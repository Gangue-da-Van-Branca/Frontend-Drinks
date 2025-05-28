import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ trigger, setTrigger }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  if (!trigger) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode colocar a lógica de autenticação
    console.log("Email:", email);
    console.log("Senha:", senha);
  };

  const handleCadastro = () => {
    navigate("/cadastro"); 
  };

  return (
    <div className="popUp">
      <div className="popUp-inner">
        <a className="close-button" onClick={() => setTrigger(false)}>
          X
        </a>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>
          <button type="submit">Entrar</button>
          <button type="button" onClick={handleCadastro}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
