import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Triagem.css"
import {
  createTriagem,
  getPacientes,
  getPrioridades,
  logoutProfessional,
} from "../services/api"
import type { PacienteAPI, PrioridadeAPI } from "../services/api"

const riscos = [
  { nome: "Vermelho", classe: "risco-vermelho", descricao: "Emergência" },
  { nome: "Laranja", classe: "risco-laranja", descricao: "Muito Urgente" },
  { nome: "Amarelo", classe: "risco-amarelo", descricao: "Urgente" },
  { nome: "Verde", classe: "risco-verde", descricao: "Pouco Urgente" },
  { nome: "Azul", classe: "risco-azul", descricao: "Não Urgente" },
]

export default function Triagem() {
  const navigate = useNavigate()
  const [pacientes, setPacientes] = useState<PacienteAPI[]>([])
  const [prioridades, setPrioridades] = useState<PrioridadeAPI[]>([])
  const [pacienteSelecionado, setPacienteSelecionado] = useState("")
  const [sistolica, setSistolica] = useState("")
  const [diastolica, setDiastolica] = useState("")
  const [temperatura, setTemperatura] = useState("")
  const [frequenciaCardiaca, setFrequenciaCardiaca] = useState("")
  const [sintomas, setSintomas] = useState("")
  const [observacoes, setObservacoes] = useState("")
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")

  useEffect(() => {
    void carregarDados()
  }, [])

  async function carregarDados() {
    await Promise.all([carregarPacientes(), carregarPrioridades()])
  }

  async function carregarPacientes() {
    try {
      const response = await getPacientes()
      setPacientes(response.pacientes)
      setErro("")
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao carregar pacientes.")
    }
  }

  async function carregarPrioridades() {
    try {
      const response = await getPrioridades()
      setPrioridades(response.prioridades)
      setErro("")
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Falha ao carregar prioridades.")
    }
  }

  function getPrioridadePorNome(nome: string) {
    return prioridades.find(
      (prioridade) => prioridade.nome_prioridade.toLowerCase() === nome.toLowerCase(),
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!pacienteSelecionado) {
      setErro("Selecione um paciente.")
      return
    }

    if (!sistolica || !diastolica || !temperatura || !frequenciaCardiaca || !sintomas || !observacoes) {
      setErro("Preencha todos os campos.")
      return
    }

    if (!prioridadeSelecionada) {
      setErro("Selecione a classificação de risco.")
      return
    }

    try {
      await createTriagem({
        paciente: Number(pacienteSelecionado),
        prioridade: Number(prioridadeSelecionada),
        pressao_arterial: `${sistolica}/${diastolica}`,
        temperatura: Number(temperatura),
        frequencia_cardiaca: Number(frequenciaCardiaca),
        observacoes,
      })

      setMensagem("Triagem registrada com sucesso.")
      setErro("")
      setSistolica("")
      setDiastolica("")
      setTemperatura("")
      setFrequenciaCardiaca("")
      setSintomas("")
      setObservacoes("")
      setPrioridadeSelecionada("")
    } catch (error) {
      setMensagem("")
      setErro(error instanceof Error ? error.message : "Não foi possível registrar a triagem.")
    }
  }

  async function handleLogout() {
    try {
      await logoutProfessional()
    } finally {
      navigate("/login")
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
              <Link className="Fila" to="/fila">
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
            <div className="campo-formulario campo-largo">
              <label>Paciente</label>

              <select
                value={pacienteSelecionado}
                onChange={(e) => setPacienteSelecionado(e.target.value)}
                required
              >
                <option value="">Selecione um paciente</option>

                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome_paciente} - {p.cpf_paciente}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid">
            <div className="dados-paciente sinais-vitais">
              <h2>
                <i className="fa-solid fa-heart-pulse"></i> Sinais Vitais
              </h2>

              <div className="formularios-dados">
                <div className="campo-formulario campo-largo">
                  <label>Pressão Arterial</label>

                  <div className="pressao-group">
                    <input
                      type="number"
                      placeholder="120"
                      value={sistolica}
                      onChange={(e) => setSistolica(e.target.value)}
                      required
                    />

                    <span>X</span>

                    <input
                      type="number"
                      placeholder="80"
                      value={diastolica}
                      onChange={(e) => setDiastolica(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="campo-formulario">
                  <label>Temperatura</label>
                  <input
                    type="number"
                    value={temperatura}
                    onChange={(e) => setTemperatura(e.target.value)}
                    required
                  />
                </div>

                <div className="campo-formulario">
                  <label>Frequência Cardíaca</label>
                  <input
                    type="number"
                    value={frequenciaCardiaca}
                    onChange={(e) => setFrequenciaCardiaca(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid">
            <div className="sintomas-paciente">
              <h2>
                <i className="fa-solid fa-file-lines"></i>
                Sintomas e Observações
              </h2>

              <div className="sintomas">
                <textarea
                  placeholder="Sintomas do paciente"
                  value={sintomas}
                  onChange={(e) => setSintomas(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Observações adicionais"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid">
            <div className="classificacao-risco">
              <h2>
                <i className="fa-solid fa-circle-exclamation"></i>
                Classificação de Risco
              </h2>

              <p className="cinza">
                Selecione a classificação de risco do paciente
              </p>

              <div className="classificacao-risco">
                {riscos.map((risco) => {
                  const prioridade = getPrioridadePorNome(risco.nome)
                  const disponivel = Boolean(prioridade)

                  return (
                    <button
                      key={risco.nome}
                      type="button"
                      className={`${risco.classe} ${
                        prioridadeSelecionada === String(prioridade?.id)
                          ? "selecionado"
                          : ""
                      }`}
                      disabled={!disponivel}
                      onClick={() => {
                        if (disponivel && prioridade) {
                          setPrioridadeSelecionada(String(prioridade.id))
                        }
                      }}
                    >
                      {risco.nome}
                      <p className="cinza">{risco.descricao}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="Finalizar">
            <button type="submit">
              <i className="fa-solid fa-check"></i> Finalizar Triagem
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
