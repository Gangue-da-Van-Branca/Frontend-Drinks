import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import HeaderSecundario from "../../components/HeaderSecundario/HeaderSecundario";
import "./Cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    senha: ""
  });

  //const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/login");  // ou qualquer rota desejada
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };*/

  return (
    <>
    <HeaderSecundario />
    <div className="cadastro-page">
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form /*onSubmit={handleSubmit}*/ className="cadastro-form">
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default Cadastro;
