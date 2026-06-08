import "../styles/login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import iconHospital from "../assets/img-hospital.jpg";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginProfessional } from "../services/api";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const perfil = formData.get("selecionar")?.toString() || "";
    const cpf = formData.get("cpf")?.toString().trim() || "";
    const coren = formData.get("corem")?.toString().trim() || "";

    if (!perfil) {
      setErrorMessage("Selecione Enfermeiro ou Técnico de Enfermagem para efetuar o login.");
      return;
    }

    if (!cpf || !coren) {
      setErrorMessage("CPF e COREN são obrigatórios para o login.");
      return;
    }

    if (perfil !== "enfermeiro" && perfil !== "tecnico-enfermagem") {
      setErrorMessage("Login inválido: perfil não autorizado.");
      return;
    }

    setErrorMessage("");

    try {
      const result = await loginProfessional(cpf, coren);

      const tipoEsperado = perfil === 'enfermeiro' ? 'E' : 'T';
      if (result.usuario?.tipo !== tipoEsperado) {
        setErrorMessage('Esse profissional não corresponde ao perfil selecionado.');
        return;
      }

      sessionStorage.setItem('auth_user', JSON.stringify(result.usuario));

      navigate('/triagem');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao verificar o login. Tente novamente mais tarde.');
    }
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
                <label htmlFor="enfermeiro">
                <input id="enfermeiro" name="selecionar" type="radio" value="enfermeiro" />
                Enfermeiro
                </label>

                <label htmlFor="tecnico-enfermagem">
                <input id="tecnico-enfermagem" name="selecionar" type="radio" value="tecnico-enfermagem" />
                Técnico de Enfermagem
                </label>

                <div className="informacoes-profissional">
                <input type="text" name="cpf" id="cpf" placeholder="CPF *"></input>

                <input type="text" name="corem" id="corem" placeholder="COREN *"></input>

                {errorMessage && <p className="mensagem-de-erro" aria-live="polite">{errorMessage}</p>}

                <input type="submit" value="Entrar" className="acessar-triagem"></input>

                </div>
              </div>
          </form>
        </div>
      </section>
    </main>
  );
}
