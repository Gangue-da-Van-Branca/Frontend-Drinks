import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ trigger, setTrigger, setNome }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (!trigger) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

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

        // Armazena os dados no localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("idUsuario", data.idUsuario);

        // Busca o nome do usuário
        const userResponse = await fetch(`http://localhost:8080/Usuario/${data.idUsuario}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setNome(userData.nome);  // Atualiza o estado global
        } else {
          console.warn("Não foi possível buscar o nome do usuário.");
        }

        setTrigger(false);  // Fecha o modal
      } else {
        const errorData = await response.json();
        setErro(errorData.erro || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro("Erro na conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = () => {
    setTrigger(false);  // Fecha o modal antes de navegar
    navigate("/cadastro");
  };

  return (
    <div className="popUp">
      <div className="popUp-inner">
        <button className="close-button" onClick={() => setTrigger(false)}>
          X
        </button>
        <h2>Login</h2>
        {erro && <p className="erro">{erro}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email:
            <input
              type="email"
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
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button type="button" onClick={handleCadastro}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
