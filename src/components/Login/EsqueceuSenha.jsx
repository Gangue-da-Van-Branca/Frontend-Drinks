import React, { useState } from "react";
import "./Login.css";

const EsqueceuSenha = ({ trigger, setTrigger }) => {
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mostraConfirmacao, setMostraConfirmacao] = useState(false);

  if (!trigger) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== confirmarEmail) {
      setErro("Os emails não coincidem.");
      return;
    }

    setErro("");
    console.log("Enviando recuperação de senha para:", email);
    setMostraConfirmacao(true);
  };

  return (
    <div className="popUp">
      <div className="popUp-inner">
        <a
          className="close-button"
          onClick={() => {
            setTrigger(false);
            setMostraConfirmacao(false);
            setErro("");
          }}
        >
          X
        </a>
        <h2>Recuperar Senha</h2>
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
            Confirmar Email:
            <input
              type="email"
              value={confirmarEmail}
              onChange={(e) => setConfirmarEmail(e.target.value)}
              required
            />
          </label>
          {erro && <p className="erro">{erro}</p>}
          <button type="submit" disabled={mostraConfirmacao}>
            {mostraConfirmacao ? "Email enviado!" : "Enviar Email"}
          </button>
          <p
            id="check"
            href="#"
            className={`mensagem-confirmacao ${
              mostraConfirmacao ? "visivel" : ""
            }`}
          >
            Verifique seu email para redefinir sua senha.
          </p>
        </form>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
