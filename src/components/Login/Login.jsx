import React, { useState } from "react";
import "./Login.css";
import EsqueceuSenha from "./EsqueceuSenha"; // importe o pop-up de recuperação

const Login = ({ trigger, setTrigger }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showEsqueceuSenha, setShowEsqueceuSenha] = useState(false); // controle do pop-up

  if (!trigger) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", senha);
  };

  const handleEsqueceuSenhaClick = (e) => {
    e.preventDefault(); // evita redirecionamento
    setShowEsqueceuSenha(true); // mostra o pop-up
  };

  return (
    <>
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
            <a id="senha" href="#" onClick={handleEsqueceuSenhaClick}>
              Esqueceu sua senha?
            </a>
          </form>
        </div>
      </div>

      {/* Mostra o pop-up de recuperação de senha */}
      <EsqueceuSenha trigger={showEsqueceuSenha} setTrigger={setShowEsqueceuSenha} />
    </>
  );
};

export default Login;
