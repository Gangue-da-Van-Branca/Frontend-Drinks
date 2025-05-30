import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmacaoSenha) {
      alert("As senhas não conferem!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/Auth/register`, {
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
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert("Erro ao cadastrar usuário: " + (errorData.message || "Erro desconhecido"));
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
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
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
