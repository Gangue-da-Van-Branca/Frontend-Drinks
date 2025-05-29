import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ trigger, setTrigger }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  if (!trigger) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido:", data);

        // Armazena o token no localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login realizado com sucesso!");

        setTrigger(false);
      } else {
        const errorData = await response.json();
        setErro(errorData.erro || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro("Erro na conexão com o servidor");
    }
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
        {erro && <p className="erro">{erro}</p>}
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
          <button type="button" onClick={handleCadastro}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
