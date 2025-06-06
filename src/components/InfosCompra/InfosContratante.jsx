import React, { useEffect } from "react";
import "./InfosContratante.css";
import { useNavigate } from "react-router-dom";
import { useOrcamento } from "../../context/OrcamentoContext";
import logo from "../../assets/images/logo2.png";
import sair from "../../assets/icons/Botão X.svg";
import voltar from "../../assets/icons/arrow-white.svg";

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
          const response = await fetch(`${import.meta.env.VITE_API_URL}/Usuario/${idUsuario}`, {
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
    <div id="info-border">
      <div className="infos-container">
        <div id="botoes">
          <button type="submit" onClick={() => navigate('/')}>
            <img src={sair} alt="" />
          </button>
          <button type="submit" onClick={() => navigate("/opcionais")}>
            <img src={voltar} alt="" />
          </button>
        </div>

        <img src={logo} alt="logo" id="logo" />

        <p id="legenda">
          Seu evento está quase pronto! Preencha os dados abaixo e a festa já
          vai começar!
        </p>

        <form className="infos-form" onSubmit={handleSubmit}>
          <div className="section-title">INFORMAÇÕES DO CONTRATANTE</div>
          <div id="linha-horizontal-infos" />
          <div className="form-grid">
            <input
              name="nome"
              placeholder="NOME"
              onChange={handleChange}
              value={formData.nome}
            />
            <input
              name="sobrenome"
              placeholder="SOBRENOME"
              onChange={handleChange}
              value={formData.sobrenome}
            />
            <input
              name="telefone"
              placeholder="TELEFONE"
              onChange={handleChange}
              value={formData.telefone}
            />
            <input
              name="email"
              placeholder="E-MAIL"
              onChange={handleChange}
              value={formData.email}
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
    </div>
  );
}
