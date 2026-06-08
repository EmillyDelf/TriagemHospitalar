import "../styles/Triagem.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState, type FormEvent, type MouseEvent } from "react";
import {
  createTriagem,
  getPacientes,
  getPrioridades,
  logoutProfessional,
} from "../services/api";
import type { PacienteAPI, PrioridadeAPI } from "../services/api";

export default function Triagem() {
  const [pacientes, setPacientes] = useState<PacienteAPI[]>([])
  const [prioridades, setPrioridades] = useState<PrioridadeAPI[]>([])
  const [pacienteId, setPacienteId] = useState("")
  const [prioridadeId, setPrioridadeId] = useState("")
  const [sistolica, setSistolica] = useState("")
  const [diastolica, setDiastolica] = useState("")
  const [temperatura, setTemperatura] = useState("")
  const [frequenciaCardiaca, setFrequenciaCardiaca] = useState("")
  const [sintomas, setSintomas] = useState("")
  const [observacoes, setObservacoes] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")

  const prioridadesPorNome = useMemo(() => {
    return prioridades.reduce<Record<string, PrioridadeAPI>>((acumulador, prioridade) => {
      acumulador[prioridade.nome_prioridade.toLowerCase()] = prioridade
      return acumulador
    }, {})
  }, [prioridades])

  const pacienteSelecionado = pacienteId || (pacientes[0] ? String(pacientes[0].id) : "")
  const prioridadeSelecionada = prioridadeId || (prioridades[0] ? String(prioridades[0].id) : "")

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pacientesResponse, prioridadesResponse] = await Promise.all([
          getPacientes(),
          getPrioridades(),
        ])

        setPacientes(pacientesResponse.pacientes)
        setPrioridades(prioridadesResponse.prioridades)
      } catch (error) {
        setErro(error instanceof Error ? error.message : "Falha ao carregar dados da triagem.")
      }
    }
    

    carregarDados()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const pacienteSelecionadoNumero = Number(pacienteSelecionado)
    const prioridadeSelecionadaNumero = Number(prioridadeSelecionada)
    const sistolicaNumero = Number(sistolica)
    const diastolicaNumero = Number(diastolica)
    const temperaturaNumero = Number(temperatura)
    const frequenciaNumero = Number(frequenciaCardiaca)

    if (!pacienteSelecionadoNumero || !prioridadeSelecionadaNumero) {
      setErro("Selecione um paciente e uma prioridade.")
      return
    }

    if (!Number.isFinite(sistolicaNumero) || !Number.isFinite(diastolicaNumero)) {
      setErro("Informe a pressão arterial corretamente.")
      return
    }

    if (!Number.isFinite(temperaturaNumero) || !Number.isFinite(frequenciaNumero)) {
      setErro("Informe temperatura e frequência cardíaca.")
      return
    }

    try {
      await createTriagem({
        paciente: pacienteSelecionadoNumero,
        prioridade: prioridadeSelecionadaNumero,
        pressao_arterial: `${sistolicaNumero}/${diastolicaNumero}`,
        temperatura: temperaturaNumero,
        frequencia_cardiaca: frequenciaNumero,
        observacoes: [
          sintomas ? `Sintomas relatados: ${sintomas}` : "",
          observacoes ? `Observações adicionais: ${observacoes}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      })

      setMensagem("Triagem registrada com sucesso.")
      setErro("")
      setSintomas("")
      setObservacoes("")
      setSistolica("")
      setDiastolica("")
      setTemperatura("")
      setFrequenciaCardiaca("")
    } catch (error) {
      setMensagem("")
      setErro(error instanceof Error ? error.message : "Falha ao salvar a triagem.")
    }
  }

  async function handleLogout(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    try {
      await logoutProfessional()
    } catch {
      // Se a sessão já expirou, só limpa o estado local.
    } finally {
      sessionStorage.removeItem("auth_user")
      window.location.href = "/login"
    }
  }

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
              <Link className="Sair" to="/login" onClick={handleLogout}>
                Sair
              </Link>
            
            </div>
          </div>
        </div>
      </header>

      <main>
        <form className="container" onSubmit={handleSubmit}>
          {mensagem && <p className="cinza">{mensagem}</p>}
          {erro && <p className="cinza">{erro}</p>}

          <div className="grid">
            <div className="dados-paciente sinais-vitais">
              <h2>
                <i className="fa-solid fa-heart-pulse"></i> Sinais Vitais
              </h2>

              <div className="formularios-dados">
                  <div className="campo-formulario campo-largo">
                    <label htmlFor="paciente">Paciente</label>
                    <select
                      id="paciente"
                      value={pacienteSelecionado}
                      onChange={(event) => setPacienteId(event.target.value)}
                      required
                    >
                      <option value="">Selecione um paciente</option>
                      {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                          {paciente.nome_paciente} - {paciente.cpf_paciente}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="campo-formulario campo-largo">
                    <label>Pressão Arterial</label>

                    <div className="pressao-group">
                      <input
                        type="number"
                        name="sistolica"
                        placeholder="120"
                        value={sistolica}
                        onChange={(event) => setSistolica(event.target.value)}
                        min={80}
                        max={200}
                        required
                      />

                      <span>X</span>

                      <input
                        type="number"
                        name="diastolica"
                        placeholder="80"
                        value={diastolica}
                        onChange={(event) => setDiastolica(event.target.value)}
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
                     value={temperatura}
                     onChange={(event) => setTemperatura(event.target.value)}
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
                      value={frequenciaCardiaca}
                      onChange={(event) => setFrequenciaCardiaca(event.target.value)}
                      required/>
                  </div>
              </div>
            </div>
          </div>

          <div className="grid">
            <div className="sintomas-paciente">
              <h2>
                <i className="fa-solid fa-file-lines"> </i>
                Sintomas e Observações
              </h2>

              <div className="sintomas">
                <h3>Sintomas relatados</h3>
                <textarea
                  id="sintoma-relatado"
                  name="sintoma_relatado"
                  placeholder="Descreva os Sintomas do Paciente"
                  value={sintomas}
                  onChange={(event) => setSintomas(event.target.value)}
                  required></textarea>

                <h3>Observações Adicionais</h3>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  placeholder="Informações Complementares, Alergias, Medicamentos em Uso.."
                  value={observacoes}
                  onChange={(event) => setObservacoes(event.target.value)}
                  required></textarea>
              </div>
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
                  <div className="classificacao-risco">
                 
                    {[
                      {
                        nome: "Vermelho",
                        classe: "risco-vermelho",
                        descricao: "Emergência - Risco Imediato de Vida",
                      },
                      {
                        nome: "Laranja",
                        classe: "risco-laranja",
                        descricao: "Muito Urgente - Risco Potencial de Vida",
                      },
                      {
                        nome: "Amarelo",
                        classe: "risco-amarelo",
                        descricao: "Urgente - Pode esperar até 1 Hora",
                      },
                      {
                        nome: "Verde",
                        classe: "risco-verde",
                        descricao: "Pouco Urgente - Pode Esperar até 2 Horas",
                      },
                      {
                        nome: "Azul",
                        classe: "risco-azul",
                        descricao: "Não Urgente - Atendimento Ambulatorial",
                      },
                    ].map((risco) => {
                      const prioridade = prioridadesPorNome[risco.nome.toLowerCase()]

                      if (!prioridade) {
                        return null
                      }
                    
                      return (
                        <button
                          key={risco.nome}
                          type="button"
                          className={`${risco.classe} ${prioridadeSelecionada === String(prioridade.id) ? "selecionado" : ""}`}
                          onClick={() => setPrioridadeId(String(prioridade.id))}
                        >
                          {risco.nome}
                          <p className="cinza">{risco.descricao}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="Finalizar">
            <button type="submit"><i className="fa-solid fa-check"></i>
            {" "}{" "}Finalizar Triagem</button>
          </div>
        </form>
      </main>
    </div>
  );
}
