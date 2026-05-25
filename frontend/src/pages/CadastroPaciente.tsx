import { User, Home, CircleCheck } from "lucide-react";
import "../styles/CadastroPaciente.css"
export default function CadastroPaciente() {
  return (
    <main className="page">
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
            <input placeholder="Digite o nome do paciente" />
          </div>

          <div className="field nascimento">
            <label>Data de Nascimento</label>
            <input placeholder="Data" />
          </div>

          <div className="field sexo">
            <label>Sexo</label>
            <input placeholder="Sexo" />
          </div>

          <div className="field cpf">
            <label>CPF</label>
            <input placeholder="000.000.000-00" />
          </div>

          <div className="field telefone">
            <label>Telefone</label>
            <input placeholder="(DDD) 9999-9999" />
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
            <input placeholder="Rua, Avenida, Alameda..." />
          </div>

          <div className="field numero">
            <label>Numero</label>
            <input placeholder="0" />
          </div>

          <div className="field bairro">
            <label>Bairro</label>
            <input placeholder="Bairro" />
          </div>

          <div className="field uf">
            <label>UF</label>

            <select defaultValue="PB">
              <option>PB</option>
              <option>PE</option>
            </select>
          </div>

          <div className="field cidade">
            <label>Cidade</label>
            <input placeholder="Cidade" />
          </div>
        </div>
      </section>

      <button className="submit-button">
        <CircleCheck size={22} />
        Finalizar Cadastro
      </button>
    </main>
  );
}