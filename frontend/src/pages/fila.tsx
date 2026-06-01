import { useState } from "react"
import "../styles/Fila.css"
import { Link } from "react-router-dom";
export default function Fila() {
	
    const [pacientes] = useState([

        {	id:1,
            nome: "Maria da Silva",
            cpf: "123.456.789-00",
            prioridade: "Emergência",
            prioridadeKey: "emergencia",
			temperatura: 40.5,
			frequencia_cardiaca: "99",
            pressao:"17/9",
			data_e_horario: "12/05/2026 14:30"
        },

        {	id:2,
            nome: "Pedro da Silva",
            cpf: "001.002.020-50",
            prioridade: "Não Urgente",
            prioridadeKey: "nao-urgente",
			temperatura: 37.5,
			frequencia_cardiaca: "99",
			pressao:"12/9",
            data_e_horario: "12/05/2026 15:30"
        },

        {	id:3,
            nome: "Maria da Silva",
            cpf: "123.456.789-00",
            prioridade: "Pouco Urgente",
            prioridadeKey: "pouco-urgente",
			temperatura: 36.5,
			frequencia_cardiaca: "99",
			pressao:"14/9",
            data_e_horario: "12/05/2026 15:00"
        },
        {	id:4,
            nome: "Maria da Silva",
            cpf: "123.456.789-00",
            prioridade: "Pouco Urgente",
            prioridadeKey: "pouco-urgente",
			temperatura: 36.5,
			frequencia_cardiaca: "99",
			pressao:"14/9",
            data_e_horario: "12/05/2026 15:00"
        }

    ])

    const contagemPorPrioridade = pacientes.reduce((acumulador, paciente) => {
        const chave = paciente.prioridadeKey
        acumulador[chave] = (acumulador[chave] ?? 0) + 1
        return acumulador
    }, {
        emergencia: 0,
        "muito-urgente": 0,
        urgente: 0,
        "pouco-urgente": 0,
        "nao-urgente": 0,
    } as Record<string, number>)

    const indicadores = [
        { label: "Vermelho", className: "container-vermelho", count: contagemPorPrioridade.emergencia },
        { label: "Laranja", className: "container-laranja", count: contagemPorPrioridade["muito-urgente"] },
        { label: "Amarelo", className: "container-amarelo", count: contagemPorPrioridade.urgente },
        { label: "Verde", className: "container-verde", count: contagemPorPrioridade["pouco-urgente"] },
        { label: "Azul", className: "container-azul", count: contagemPorPrioridade["nao-urgente"] },
    ]

    return (
        <main className="fila-page">
            <div className="fila-topo">
                <div className="top-row">
                    <h1>Fila de Espera</h1>
                    <Link className="triagem-link" to="/triagem">Triagem</Link>
                </div>

                <p>Sistema de Gereciamento Hospitalar</p>
                <div className="indicadores">
                    <form className="buscar">
                        <div className="buscar-campo">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                name="buscar"
                                id="Buscar"
                                placeholder="Busque Por Nome ou CPF"
                            />
                        </div>
                    </form>

                    <div className="classificacoes">
                        <ul>
                            {indicadores.map((indicador) => (
                                <li className={indicador.className} key={indicador.label}>
                                    <span>{indicador.label}</span>
                                    <strong>{indicador.count}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="fila-container">
                <div className="nomeclaturas">
                    <ul>
                        <li>Nome</li>
                        <li>CPF</li>
                        <li>Prioridade</li>
                        <li>Temperatura</li>
                        <li>Frequência Cardíaca</li>
                        <li>Pressão</li>
                        <li>Data/Horário</li>
                    </ul>
                </div>

                {pacientes.map((paciente) => (
                    <div className="card-paciente" key={paciente.id}>
                        <div className="grid-paciente">
                            <div className="coluna-paciente">
                                <span className="rotulo">Nome</span>
                                <strong>{paciente.nome}</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">CPF</span>
                                <strong>{paciente.cpf}</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Prioridade</span>
                                <strong className={`Prioridade ${paciente.prioridadeKey}`}>
                                    {paciente.prioridade}
                                </strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Temperatura</span>
                                <strong>{paciente.temperatura}°C</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Frequência</span>
                                <strong>{paciente.frequencia_cardiaca}</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Pressão</span>
                                <strong>{paciente.pressao}</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Data/Horário</span>
                                <strong>{paciente.data_e_horario}</strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}