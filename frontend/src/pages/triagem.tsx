import "../styles/Triagem.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Triagem() {
  return (
    <>
      <header>
        <div className="cabecalho">
          <div className="titulo">
            <h1>Triagem - Hospital Público</h1>

            <h3 className="cinza">Sistema de Classificação de Risco</h3>
          </div>

          <div className="navegacao">
            <div className="navegar">
              <a className="Cadastro" href="#">
                Cadastrar Paciente
              </a>
              <a className="Sair" href="#">
                Sair
              </a>
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
                      />

                      <span>X</span>

                      <input
                        type="number"
                        name="diastolica"
                        placeholder="80"
                        min={50}
                        max={130}
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
                    />
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
                    />
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
                ></textarea>

                <h3>Observações Adicionais</h3>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  placeholder="Informações Complementares, Alergias, Medicamentos em Uso.."
                ></textarea>
              </form>
            </div>
          </div>

          <div className="grid">
            <div className="classificacao-risco">
              <div className="prioridades">
               
                <label>Classificação de Risco</label>
                
                <p>Seleciona a Classificação de Risco do Paciente</p>
                
                <div className="classificacao-risco">
                  <button className="risco-vermelho">Vermelho</button>

                  <button className="risco-laranja">Laranja</button>

                  <button className="risco-amarelo">Amarelo</button>

                  <button className="risco-verde">Verde</button>

                  <button className="risco-azul">Azul</button>
                </div>
              </div>
            </div>
          </div>

          <div className="Finalizar">
            <button>Finalizar</button>
          </div>
        </div>
      </main>
    </>
  );
}
