import "../../components/InfosCompra/InfosContratante.css";
import "./OrcamentoResumo.css";
import { useNavigate } from "react-router-dom";
import { useOrcamento } from "../../context/OrcamentoContext";
import logo from "../../assets/images/logo2.png";
import sair from "../../assets/icons/Botão X.svg";
import voltar from "../../assets/icons/arrow-white.svg";

export default function OrcamentoResumo() {
  const { orcamento, resetarOrcamento } = useOrcamento();
  const navigate = useNavigate();

  const { baseFesta, opcionais, infosContratante } = orcamento;

  const handleConfirmar = () => {
    console.log(JSON.parse(JSON.stringify(orcamento)));
    alert("Orçamento enviado com sucesso!");
    resetarOrcamento();
    navigate("/");
  };

  const renderCampo = (label, valor) => (
    <div key={label}>
      <strong>{label}:</strong> {valor || "-"}
    </div>
  );

  return (
    <div id="info-border">
      <div className="infos-container">
        <div id="botoes">
          <button type="submit" onClick={() => navigate("/")}>
            <img src={sair} alt="" />
          </button>
          <button type="submit" onClick={() => navigate("/infosContratante")}>
            <img src={voltar} alt="" />
          </button>
        </div>

        <img src={logo} alt="logo" id="logo" />
        <div id="colunas">
          <div id="enquadramento">
            <div className="infos-form">
              <div className="section-title" id="orc-sec">
                DADOS DO CONTRATANTE
              </div>
              <div id="resumo-form-grid">
                {renderCampo(
                  "Nome",
                  `${infosContratante.nome || ""} ${
                    infosContratante.sobrenome || ""
                  }`.trim()
                )}
                {renderCampo("Telefone", infosContratante.telefone)}
                {renderCampo("Email", infosContratante.email)}
                {renderCampo("Data", infosContratante.data)}
                {renderCampo("Endereço", infosContratante.endereco)}
                {renderCampo("CEP", infosContratante.cep)}
                {renderCampo("Horário Início", infosContratante.horarioInicio)}
                {renderCampo("Horário Final", infosContratante.horarioFinal)}
                {renderCampo("Convidados", infosContratante.convidados)}
              </div>
            </div>

            <div className="infos-form">
              <div className="section-title" id="orc-sec">
                BASE DA FESTA
              </div>
              <div className="form-grid">
                {Object.entries(baseFesta)
                  .slice(1)
                  .map(([key, value]) => {
                    let valorFormatado;

                    if (Array.isArray(value)) {
                      valorFormatado = (
                        <ul>
                          {value.map((v, index) => (
                            <li key={index}>{v.nome || v}</li>
                          ))}
                        </ul>
                      );
                    } else if (typeof value === "object" && value !== null) {
                      valorFormatado = value.nome || JSON.stringify(value);
                    } else {
                      valorFormatado = value;
                    }

                    return renderCampo(key, valorFormatado);
                  })}
              </div>
            </div>
          </div>

          <div id="enquadramento">
            <div className="section-title" id="orc-sec">
              OPCIONAIS
            </div>

            <div className="form-grid">
              {Object.values(opcionais.shots).some((val) => val > 0) && (
                <div>
                  <strong>Shots:</strong>
                  <ul>
                    {Object.entries(opcionais.shots)
                      .filter(([_, val]) => val > 0)
                      .map(([key, val]) => (
                        <li key={key}>
                          {key}: {val}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="form-grid">
              {Object.values(opcionais.extras).some((val) => val > 0) && (
                <div>
                  <strong>Extras:</strong>
                  <ul>
                    {Object.entries(opcionais.extras)
                      .filter(([_, val]) => val > 0)
                      .map(([key, val]) => (
                        <li key={key}>
                          {key}: {val}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div id="enquadramento">
             <div className="section-title" id="orc-sec">
              BARES
            </div>
            <div>
              <strong>Bares Adicionais:</strong>
              <ul>
                {opcionais.baresAdicionais.length > 0 ? (
                  opcionais.baresAdicionais.map((bar) => (
                    <li key={bar}>{bar}</li>
                  ))
                ) : (
                  <li>Nenhum</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
