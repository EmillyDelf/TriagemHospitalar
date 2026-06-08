import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { User, Home, CircleCheck } from "lucide-react";
import "../styles/CadastroPaciente.css"
import { createPaciente } from "../services/api"

export default function CadastroPaciente() {
  const navigate = useNavigate()
  const [nomePaciente, setNomePaciente] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [cpfPaciente, setCpfPaciente] = useState("")
  const [telefone, setTelefone] = useState("")
  const [rua, setRua] = useState("")
  const [numero, setNumero] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("PB")
  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cpfLimpo = cpfPaciente.replace(/\D/g, "")

    if (!nomePaciente || !dataNascimento || cpfLimpo.length !== 11) {
      setErro("Preencha nome, data de nascimento e CPF válido.")
      return
    }

    try {
      await createPaciente({
        nome_paciente: nomePaciente,
        cpf_paciente: cpfLimpo,
        data_nascimento: dataNascimento,
      })

      sessionStorage.setItem(
        "ultimo_paciente_cadastrado",
        JSON.stringify({ nomePaciente, cpfPaciente: cpfLimpo }),
      )

      setMensagem("Paciente cadastrado com sucesso.")
      setErro("")
      navigate("/triagem")
    } catch (error) {
      setMensagem("")
      setErro(error instanceof Error ? error.message : "Não foi possível cadastrar o paciente.")
    }
  }

  return (
    <main className="page">
      <form onSubmit={handleSubmit}>
      <section className="header-card">
        <h1>Cadastro Paciente</h1>
        <p>Preencha os Dados para Cadastro no Sistema</p>
      </section>

      <section className="card paciente-card">
        <div className="section-title small-icon">
          <User size={22} />
          <h2>Dados do Paciente</h2>
        </div>

        <div className="grid paciente-grid">
          <div className="field nome">
            <label>Nome Completo</label>
            <input value={nomePaciente} onChange={(event) => setNomePaciente(event.target.value)} placeholder="Digite o nome do paciente" />
          </div>

          <div className="field nascimento">
            <label>Data de Nascimento</label>
            <input type="date" value={dataNascimento} onChange={(event) => setDataNascimento(event.target.value)} placeholder="Data" />
          </div>

          <div className="field sexo">
            <label>Sexo</label>
            <input placeholder="Sexo" />
          </div>

          <div className="field cpf">
            <label>CPF</label>
            <input value={cpfPaciente} onChange={(event) => setCpfPaciente(event.target.value)} placeholder="000.000.000-00" />
          </div>

          <div className="field telefone">
            <label>Telefone</label>
            <input value={telefone} onChange={(event) => setTelefone(event.target.value)} placeholder="(DDD) 9999-9999" />
          </div>
        </div>
      </section>

      <section className="card endereco-card">
        <div className="section-title endereco-title">
          <div className="home-box">
            <Home size={24} />
          </div>
          <h2>Endereço</h2>
        </div>

        <div className="grid endereco-grid">
          <div className="field rua">
            <label>Rua</label>
            <input value={rua} onChange={(event) => setRua(event.target.value)} placeholder="Rua, Avenida, Alameda..." />
          </div>

          <div className="field numero">
            <label>Numero</label>
            <input value={numero} onChange={(event) => setNumero(event.target.value)} placeholder="0" />
          </div>

          <div className="field bairro">
            <label>Bairro</label>
            <input value={bairro} onChange={(event) => setBairro(event.target.value)} placeholder="Bairro" />
          </div>

          <div className="field uf">
            <label>UF</label>

            <select value={uf} onChange={(event) => setUf(event.target.value)}>
              <option>PB</option>
              <option>PE</option>
            </select>
          </div>

          <div className="field cidade">
            <label>Cidade</label>
            <input value={cidade} onChange={(event) => setCidade(event.target.value)} placeholder="Cidade" />
          </div>
        </div>
      </section>

      {mensagem && <p>{mensagem}</p>}
      {erro && <p>{erro}</p>}

      <button className="submit-button" type="submit">
        <CircleCheck size={22} />
        Finalizar Cadastro
      </button>
      </form>
    </main>
  );
}