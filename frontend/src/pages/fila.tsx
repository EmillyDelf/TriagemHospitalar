import { useEffect, useMemo, useState, type FormEvent } from "react"
import "../styles/Fila.css"
import { Link } from "react-router-dom";
import { getTriagens } from "../services/api";
import type { TriagemAPI } from "../services/api";

function getPrioridadeKey(prioridade?: string | null) {
    const nome = (prioridade || "").toLowerCase()

    if (nome.includes("vermelho")) return "emergencia"
    if (nome.includes("laranja")) return "muito-urgente"
    if (nome.includes("amarelo")) return "urgente"
    if (nome.includes("verde")) return "pouco-urgente"
    if (nome.includes("azul")) return "nao-urgente"

    return "nao-urgente"
}

export default function Fila() {
    const [triagens, setTriagens] = useState<TriagemAPI[]>([])
    const [buscaCpf, setBuscaCpf] = useState("")
    const [erro, setErro] = useState("")

    async function carregarTriagens(cpf?: string) {
        try {
            const response = await getTriagens(cpf)
            setTriagens(response.triagens)
            setErro("")
        } catch (error) {
            setErro(error instanceof Error ? error.message : "Falha ao carregar a fila.")
        }
    }

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            void carregarTriagens()
        }, 0)

        return () => window.clearTimeout(timeoutId)
    }, [])

    const contagemPorPrioridade = triagens.reduce((acumulador, triagem) => {
        const chave = getPrioridadeKey(triagem.prioridade)
        acumulador[chave] = (acumulador[chave] ?? 0) + 1
        return acumulador
    }, {
        emergencia: 0,
        "muito-urgente": 0,
        urgente: 0,
        "pouco-urgente": 0,
        "nao-urgente": 0,
    } as Record<string, number>)

    const triagensOrdenadas = useMemo(() => {
        return [...triagens].sort((a, b) => {
            const ordem = {
                vermelho: 1,
                laranja: 2,
                amarelo: 3,
                verde: 4,
                azul: 5,
            }

            return (ordem[getPrioridadeKey(a.prioridade) as keyof typeof ordem] ?? 99) -
                (ordem[getPrioridadeKey(b.prioridade) as keyof typeof ordem] ?? 99)
        })
    }, [triagens])

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        await carregarTriagens(buscaCpf.trim())
    }

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
                {erro && <p>{erro}</p>}
                <div className="indicadores">
                    <form className="buscar" onSubmit={handleSubmit}>
                        <div className="buscar-campo">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                name="buscar"
                                id="Buscar"
                                placeholder="Busque Por Nome ou CPF"
                                value={buscaCpf}
                                onChange={(event) => setBuscaCpf(event.target.value)}
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

                {triagensOrdenadas.map((triagem) => {
                    const prioridadeKey = getPrioridadeKey(triagem.prioridade)

                    return (
                    <div className="card-paciente" key={triagem.id}>
                        <div className="grid-paciente">
                            <div className="coluna-paciente">
                                <span className="rotulo">Nome</span>
                                <strong>{triagem.paciente.nome}</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">CPF</span>
                                <strong>{triagem.paciente.cpf}</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Prioridade</span>
                                <strong className={`Prioridade ${prioridadeKey}`}>
                                    {triagem.prioridade || "Sem prioridade"}
                                </strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Temperatura</span>
                                <strong>{triagem.temperatura ?? "-"}°C</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Frequência</span>
                                <strong>{triagem.frequencia_cardiaca ?? "-"}</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Pressão</span>
                                <strong>{triagem.pressao_arterial}</strong>
                            </div>

                            <div className="coluna-paciente">
                                <span className="rotulo">Data/Horário</span>
                                <strong>{new Date(triagem.data_hora).toLocaleString("pt-BR")}</strong>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </main>
    )
}