import "../styles/login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import iconHospital from "../assets/img-hospital.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate('/triagem');
  }

  return (
    <main className="login-page">
      <section className="login-card">
        
        <div className="cabecalho">
        
        
        <div className="icon-hospital">
          <img src={iconHospital} alt="Ícone do hospital" />
        </div>
        
        
          <h1>Sistema Hospitalar</h1>
          <p>Acesso de Profissionais.</p>
        </div>

        <div className="formulario">
          
          <form onSubmit={handleSubmit}>
            
            <div className="selecionar-profissional">
                <label>
                <input id="selecionar" name="selecionar" type="radio" value="enfermeiro" />
                Enfermeiro
                </label>

                <label>
                <input id="selecionar" name="selecionar" type="radio" value="tecnico-enfermagem"/>
                Técnico de Enfermagem
                </label>

                <div className="informacoes-profissional">
                <input type="text" name="cpf" id="cpf" placeholder="CPF *"></input>

                <input type="text" name="corem" id="corem" placeholder="COREN *"></input>
                 
                <input type="submit" value="Entrar" className="acessar-triagem"></input>

                </div>
              </div>
          </form>
        </div>
      </section>
    </main>
  );
}
