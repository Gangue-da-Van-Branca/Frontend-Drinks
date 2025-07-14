import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Login.css";

const EsqueceuSenha = ({ trigger, setTrigger, onClose }) => {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mostraConfirmacao, setMostraConfirmacao] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!trigger) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!email.trim()) {
      setErro("Por favor, insira um email válido.");
      return;
    }

    setErro("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMostraConfirmacao(true);
        toast.success("Email de recuperação enviado com sucesso!");
        
        // Fecha o popup após 3 segundos
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        let errorMessage = "Erro ao enviar email de recuperação.";
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.erro || errorMessage;
        } catch (jsonError) {
          // Se não conseguir fazer parse do JSON, usa mensagem padrão
          console.warn("Resposta não é JSON válido:", jsonError);
        }
        
        setErro(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Erro:", error);
      setErro("Erro ao conectar com o servidor.");
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTrigger(false);
    setMostraConfirmacao(false);
    setErro("");
    setEmail("");
    setIsSubmitting(false);
    if (onClose) onClose();
  };

  return (
    <div className="popUp">
      <div className="popUp-inner">
        <a className="close-button" onClick={handleClose}>
          X
        </a>
        <h2>Recuperar Senha</h2>
        
        {!mostraConfirmacao ? (
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                placeholder="Digite seu email"
              />
            </label>
            {erro && <p className="erro">{erro}</p>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Email"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default EsqueceuSenha;
