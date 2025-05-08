import React, { useState } from "react";
import "./InfosContratante.css";
import { useNavigate } from "react-router-dom";

export default function InfosForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
    data: "",
    endereco: "",
    horarioInicio: "",
    horarioFinal: "",
    cep: "",
    convidados: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyField = Object.values(formData).some((field) => field.trim() === "");
    if (emptyField) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    navigate("/resumo"); 
  };

  return (
    <div className="infos-container">
      <h1 className="logo">ELO <span>DRINKS</span></h1>

      <form className="infos-form" onSubmit={handleSubmit}>
        <div className="section-title">INFORMAÇÕES DO CONTRATANTE</div>
        <div id="linha-horizontal-infos" />
        <div className="form-grid">
          <input name="nome" placeholder="NOME" onChange={handleChange} value={formData.nome} />
          <input name="sobrenome" placeholder="SOBRENOME" onChange={handleChange} value={formData.sobrenome} />
          <input name="telefone" placeholder="TELEFONE" onChange={handleChange} value={formData.telefone} />
          <input name="email" placeholder="E-MAIL" onChange={handleChange} value={formData.email} />
        </div>

        <div className="section-title">INFORMAÇÕES DO EVENTO</div>
        <div id="linha-horizontal-infos" />
        <div className="form-grid">
          <input name="data" placeholder="DATA" onChange={handleChange} value={formData.data} />
          <input name="endereco" placeholder="ENDEREÇO DO EVENTO" onChange={handleChange} value={formData.endereco} />
          <input name="horarioInicio" placeholder="HORÁRIO DE INICIO" onChange={handleChange} value={formData.horarioInicio} />
          <input name="cep" placeholder="CEP" onChange={handleChange} value={formData.cep} />
          <input name="horarioFinal" placeholder="HORÁRIO FINAL" onChange={handleChange} value={formData.horarioFinal} />
          <input name="convidados" placeholder="NÚMERO DE CONVIDADOS" onChange={handleChange} value={formData.convidados} />
        </div>

        <div className="form-footer">
          <button type="submit">AVANÇAR</button>
        </div>
      </form>
    </div>
  );
}
