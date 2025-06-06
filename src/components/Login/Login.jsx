import React, { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import EsqueceuSenha from "./EsqueceuSenha";

const Login = forwardRef(({ trigger, setTrigger, setNome }, ref) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEsqueceuSenha, setShowEsqueceuSenha] = useState(false);

  const navigate = useNavigate();

  if (!trigger) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido:", data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("idUsuario", data.idUsuario);

        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/Usuario/${data.idUsuario}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setNome(userData.nome);
        } else {
          console.warn("Não foi possível buscar o nome do usuário.");
        }

        setTrigger(false);
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
    setTrigger(false);
    navigate("/cadastro");
  };

  const handleEsqueceuSenhaClick = (e) => {
    e.preventDefault();
    setShowEsqueceuSenha(true);
  };

  return (
    <>
      <div className="popUp" ref={ref}>
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
             <a id="senha" href="#" onClick={handleEsqueceuSenhaClick}>
              Esqueceu sua senha?
            </a>
            <p id="bar"></p>
            <button type="submit" onClick={handleCadastro} id="cadastro">
              Cadastrar
            </button>
           
          </form>
        </div>
      </div>

      <EsqueceuSenha trigger={showEsqueceuSenha} setTrigger={setShowEsqueceuSenha} />
    </>
  );
});

export default Login;