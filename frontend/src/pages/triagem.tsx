import "../styles/Triagem.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

export default function Triagem() {
  return (
    <div className="triagem-page">
      <header>
        <div className="cabecalho">
          <div className="titulo">
            <h1>Triagem - Hospital Público</h1>

            <h3 className="cinza">Sistema de Classificação de Risco</h3>
          </div>

          <div className="navegacao">
            <div className="navegar">
              <Link className="Cadastro" to="/cadastro">
                Cadastrar Paciente
              </Link>
              <Link  className="Fila" to="/fila">
                Fila
              </Link>
              <Link className="Sair" to="/login">
                Sair
              </Link>
            
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="info-profissional">
            <div className="info">
              <h3>Profissional</h3>

              <h3 className="cinza">Rosangela</h3>
            </div>
          </div>

          <div className="grid">
            <div className="dados-paciente sinais-vitais">
              <h2>
                <i className="fa-solid fa-heart-pulse"></i> Sinais Vitais
              </h2>

              <div className="formularios-dados">
                <form>
                  <div className="campo-formulario campo-largo">
                    <label>Pressão Arterial</label>

                    <div className="pressao-group">
                      <input
                        type="number"
                        name="sistolica"
                        placeholder="120"
                        min={80}
                        max={200}
                        required
                      />

                      <span>X</span>

                      <input
                        type="number"
                        name="diastolica"
                        placeholder="80"
                        min={50}
                        max={130}
                        required
                      />
                    </div>
                  </div>

                  <div className="campo-formulario">
                    <label htmlFor="temp">
                      <i className="fa-solid fa-temperature-half"></i>{" "}
                      Temperatura (°C)
                    </label>

                    <input
                      type="number"
                      id="temp"
                      name="temp"
                      placeholder="Ex: 37.5"
                     required/>
                  </div>

                  <div className="campo-formulario">
                    <label htmlFor="frequencia">
                      <i className="fa-solid fa-heart-pulse"></i> Frequência
                      Cardíaca
                    </label>

                    <input
                      type="number"
                      id="frequencia"
                      name="frequencia"
                      placeholder="Ex: 98"
                    required/>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="grid">
            <div className="sintomas-paciente">
              <h2>
                <i className="fa-solid fa-file-lines"> </i>
                Sintomas e Observações
              </h2>

              <form className="sintomas">
                <h3>Sintomas relatados</h3>
                <textarea
                  id="sintoma-relatado"
                  name="sintoma_relatado"
                  placeholder="Descreva os Sintomas do Paciente"
                required></textarea>

                <h3>Observações Adicionais</h3>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  placeholder="Informações Complementares, Alergias, Medicamentos em Uso.."
                required></textarea>
              </form>
            </div>
          </div>

          <div className="grid">
            <div className="classificacao-risco">
              <div className="prioridades">
                <h2>
                  <i className="fa-solid fa-circle-exclamation"> </i>
                  Classificação de Risco
                </h2>

                <p className="cinza">
                  Seleciona a Classificação de Risco do Paciente
                </p>

                <div className="classificacao-risco">
                  <button className="risco-vermelho">
                    Vermelho
                    <p className="cinza">Emergência - Risco Imediato de Vida</p>
                  </button>

                  <button className="risco-laranja">
                    Laranja
                    <p className="cinza">
                      Muito Urgente - Risco Potencial de Vida
                    </p>
                  </button>

                  <button className="risco-amarelo">
                    Amarelo
                    <p className="cinza">Urgente - Pode esperar até 1 Hora</p>
                  </button>

                  <button className="risco-verde">
                    Verde
                    <p className="cinza">
                      Pouco Urgente - Pode Esperar até 2 Horas
                    </p>
                  </button>

                  <button className="risco-azul">
                    Azul
                    <p className="cinza">
                      Não Urgente - Atendimento Ambulatorial
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="Finalizar">
            <button><i className="fa-solid fa-check"></i>
            {" "}{" "}Finalizar Triagem</button>
          </div>
        </div>
      </main>
    </div>
  );
}
