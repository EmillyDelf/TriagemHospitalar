import { Link } from "react-router-dom"
import "../styles/Fila.css"

export default function Fila() {
	return (
		<main className="fila-page">
			<section className="fila-card">
				<h1>Fila de Atendimento</h1>
				<p>
					Aqui você acompanha os pacientes que ainda aguardam triagem.
				</p>

				<div className="fila-actions">
					<Link to="/triagem" className="fila-button primary">
						Ir para triagem
					</Link>
					<Link to="/login" className="fila-button secondary">
						Voltar ao login
					</Link>
				</div>
			</section>
		</main>
	)
}

