import React, { useEffect } from "react";
import "./InfosContratante.css";
import { useNavigate } from "react-router-dom";
import { useOrcamento } from "../../context/OrcamentoContext";

export default function InfosForm() {
  const navigate = useNavigate();
  const { orcamento, atualizarContratante } = useOrcamento();
  const formData = orcamento.infosContratante;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");

      if (token && idUsuario) {
        try {
          const response = await fetch(`http://localhost:8080/Usuario/${idUsuario}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            atualizarContratante({
              ...formData,
              nome: userData.nome,
              sobrenome: userData.sobrenome,
              telefone: userData.telefone,
              email: userData.email,
            });
          } else {
            console.warn("Não foi possível carregar os dados do usuário.");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    atualizarContratante({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyField = Object.values(formData).some(
      (field) => field.trim() === ""
    );
    if (emptyField) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    navigate("/orcamento-resumo");
  };

  return (
    <div className="infos-container">
      <h1 className="logo">
        ELO <span>DRINKS</span>
      </h1>

      <form className="infos-form" onSubmit={handleSubmit}>
        <div className="section-title">INFORMAÇÕES DO CONTRATANTE</div>
        <div id="linha-horizontal-infos" />
        <div className="form-grid">
          <input
            name="nome"
            placeholder="NOME"
            onChange={handleChange}
            value={formData.nome}
            disabled
          />
          <input
            name="sobrenome"
            placeholder="SOBRENOME"
            onChange={handleChange}
            value={formData.sobrenome}
            disabled
          />
          <input
            name="telefone"
            placeholder="TELEFONE"
            onChange={handleChange}
            value={formData.telefone}
            disabled
          />
          <input
            name="email"
            placeholder="E-MAIL"
            onChange={handleChange}
            value={formData.email}
            disabled
          />
        </div>

        <div className="section-title">INFORMAÇÕES DO EVENTO</div>
        <div id="linha-horizontal-infos" />
        <div className="form-grid">
          <input
            type="date"
            name="data"
            placeholder="DATA"
            onChange={handleChange}
            value={formData.data}
          />
          <input
            name="endereco"
            placeholder="ENDEREÇO DO EVENTO"
            onChange={handleChange}
            value={formData.endereco}
          />
          <input
            type="time"
            name="horarioInicio"
            placeholder="HORÁRIO DE INICIO"
            onChange={handleChange}
            value={formData.horarioInicio}
          />
          <input
            name="cep"
            placeholder="CEP"
            onChange={handleChange}
            value={formData.cep}
          />
          <input
            type="time"
            name="horarioFinal"
            placeholder="HORÁRIO FINAL"
            onChange={handleChange}
            value={formData.horarioFinal}
          />
          <input
            name="convidados"
            placeholder="NÚMERO DE CONVIDADOS"
            type="number"
            min="1"
            onChange={handleChange}
            value={formData.convidados}
          />
        </div>

        <div className="form-footer">
          <button type="submit">AVANÇAR</button>
        </div>
      </form>
    </div>
  );
}
