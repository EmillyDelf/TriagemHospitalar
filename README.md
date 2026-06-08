# 🏥 Sistema de Triagem Hospitalar

Sistema web de triagem hospitalar desenvolvido com React, TypeScript, Django e PostgreSQL para auxiliar profissionais da saúde no gerenciamento de pacientes e classificação de risco baseada no Protocolo de Manchester.

## 📋 Sobre o Projeto

O Sistema de Triagem Hospitalar foi desenvolvido com arquitetura desacoplada, composta por um frontend responsável pela interface do usuário e um backend que disponibiliza uma API RESTful para gerenciamento dos dados.

O objetivo da aplicação é otimizar o fluxo de atendimento em unidades de saúde, permitindo o cadastro de pacientes, registro de sinais vitais, realização de triagens e organização automática da fila de atendimento conforme a gravidade clínica.

A classificação de risco segue os níveis de prioridade definidos pelo Protocolo de Manchester, contribuindo para um atendimento mais seguro e eficiente.

---

## 🚀 Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* Vite
* CSS
* Font Awesome

### Backend

* Python
* Django
* PostgreSQL
* JSON
* Python-Environ

---

## 🏗️ Arquitetura

O sistema segue uma arquitetura desacoplada entre frontend e backend.

### Frontend

Responsável pela interação com os usuários através de uma interface intuitiva para profissionais da saúde.

Principais funcionalidades:

* Cadastro de pacientes
* Consulta de pacientes
* Registro de triagens
* Visualização da fila de atendimento
* Controle de autenticação

### Backend

A API foi construída utilizando recursos nativos do Django, sem utilização do Django REST Framework.

Principais componentes:

* Models para persistência dos dados
* Views baseadas em classes (`View`)
* ORM nativa do Django
* Respostas JSON com `JsonResponse`
* Sistema de autenticação e sessão do Django

---

## ⚙️ Funcionalidades

### 🔐 Autenticação

* Login de profissionais
* Logout de sessão
* Controle de acesso baseado em perfil

#### Perfis Disponíveis

* Enfermeiro
* Técnico de Enfermagem
* Administrador

### 👤 Pacientes

* Cadastro de pacientes
* Atualização de dados cadastrais
* Exclusão de pacientes
* Busca de pacientes por CPF

### 🩺 Triagem

* Registro de triagens
* Associação entre paciente e profissional responsável
* Registro de sinais vitais
* Classificação por prioridade clínica
* Consulta da fila de atendimento
* Histórico de atendimentos

### 📊 Sinais Vitais Registrados

* Temperatura corporal
* Pressão arterial
* Frequência cardíaca
* Saturação de oxigênio
* Outros parâmetros clínicos conforme necessidade

---

## 🚦 Classificação de Risco

A fila de atendimento é organizada automaticamente conforme a prioridade atribuída durante a triagem.

### Ordem de Atendimento

1. 🔴 Vermelho – Emergência
2. 🟠 Laranja – Muito Urgente
3. 🟡 Amarelo – Urgente
4. 🟢 Verde – Pouco Urgente
5. 🔵 Azul – Não Urgente

Dentro de cada prioridade, o atendimento respeita a ordem cronológica de cadastro da triagem.

---

## ✅ Validações Implementadas

* Sanitização de CPF antes da persistência
* Temperatura limitada entre 30°C e 45°C
* Validação básica do formato da pressão arterial
* Controle de acesso para operações restritas
* Validação de dados obrigatórios
* Associação obrigatória entre triagem e profissional responsável

---

## 📁 Estrutura do Projeto

```text
triagem-hospitalar/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── atendimentos/
│   │   ├── models.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── usuarios/
│   │   ├── models.py
│   │   ├── views.py
│   │   └── admin.py
│   │
│   ├── SistemaTriagem/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## 🌐 Endpoints da API

### Autenticação

| Método | Endpoint            |
| ------ | ------------------- |
| POST   | `/api/auth/login/`  |
| POST   | `/api/auth/logout/` |

### Triagens

| Método | Endpoint                 |
| ------ | ------------------------ |
| GET    | `/api/triagens/`         |
| GET    | `/api/triagens/?cpf=...` |
| POST   | `/api/triagens/`         |

### Pacientes

| Método | Endpoint               |
| ------ | ---------------------- |
| POST   | `/api/pacientes/`      |
| PUT    | `/api/pacientes/<id>/` |
| DELETE | `/api/pacientes/<id>/` |

---

## ▶️ Como Executar o Projeto

### Backend

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

O backend estará disponível em:

```text
http://localhost:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173
```

---

## 🎯 Benefícios do Sistema

* Organização do fluxo de atendimento
* Redução do tempo de espera
* Priorização automática por gravidade clínica
* Centralização das informações dos pacientes
* Maior rastreabilidade dos atendimentos
* Apoio à tomada de decisão clínica

---

## 🔮 Possíveis Evoluções

O projeto pode ser expandido futuramente com:

* Django REST Framework
* Autenticação JWT
* Swagger/OpenAPI
* Paginação de resultados
* Auditoria de operações
* Logs clínicos
* Dashboard com indicadores
* Notificações em tempo real
* Integração com sistemas hospitalares

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos, educacionais e de aprendizado em desenvolvimento web full stack utilizando React e Django.
