import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmacaoSenha: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Evita múltiplos envios

    if (formData.senha !== formData.confirmacaoSenha) {
      toast.error("As senhas não conferem!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          email: formData.email,
          telefone: formData.telefone,
          senha: formData.senha,
          tipo: "0"
        })
      });

      if (response.ok) {
        toast.success("Usuário cadastrado com sucesso!");
        // Aguarda um pouco para mostrar o toast antes de navegar
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.error("Erro ao cadastrar usuário: " + (errorData.message || "Erro desconhecido"));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao conectar com o servidor.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="cadastro-page">
        <div className="cadastro-container">
          <h2>Cadastro</h2>
          <form onSubmit={handleSubmit} className="cadastro-form">
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Sobrenome:
              <input
                type="text"
                name="sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Senha:
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Confirme sua senha:
              <input
                type="password"
                name="confirmacaoSenha"
                value={formData.confirmacaoSenha}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
