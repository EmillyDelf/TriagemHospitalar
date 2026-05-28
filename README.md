# 🏥 Sistema de Triagem Hospitalar — API RESTful

### Implementação do Protocolo de Manchester com Django + PostgreSQL

---

## 📖 Sobre o Projeto

O **Sistema de Triagem Hospitalar** é uma API RESTful desenvolvida para gerenciar o fluxo clínico de pacientes em ambientes hospitalares utilizando o **Protocolo de Manchester** como mecanismo de classificação de risco.

A aplicação foi projetada sob a arquitetura **Decoupled Backend**, atuando exclusivamente como um provedor de dados para aplicações frontend (React, Vue, Mobile Apps ou qualquer cliente HTTP), mantendo persistência em banco de dados relacional PostgreSQL.

O sistema automatiza o ordenamento da fila de atendimento com base na gravidade clínica, além de implementar controles rigorosos de autenticação, autorização e validação fisiológica dos dados médicos.

---

# 🏛️ Arquitetura e Diferenciais Técnicos

## ⚡ API RESTful 100% Nativa

A API foi construída utilizando exclusivamente os recursos nativos do ecossistema Django:

* `View`
* `JsonResponse`
* ORM nativa

Sem utilização de frameworks externos como Django REST Framework (DRF).

Essa abordagem demonstra domínio completo sobre:

* Ciclo de vida HTTP
* Serialização manual
* Controle de status codes
* Gerenciamento de sessão
* Segurança de requisições
* Processamento de payloads JSON

---

## 🔐 Controle de Acesso Baseado em Papéis (RBAC)

O sistema implementa **Role-Based Access Control (RBAC)** para restringir operações críticas.

Perfis disponíveis:

* **Enfermeiro**
* **Técnico de Enfermagem**
* **Administrador**

As permissões são verificadas via mixins e validações de autenticação antes da execução das operações sensíveis da API.

Exemplos de proteção:

* Apenas profissionais autorizados podem alterar o estado da fila
* Validação de sessão ativa
* Controle de mutações clínicas
* Auditoria de acessos

---

## 🧬 Validação Clínica e Sanitização de Dados

O backend implementa uma camada rígida de validação fisiológica para impedir persistência de dados inválidos.

### Exemplos de validação:

* Temperatura corporal permitida apenas entre `30°C` e `45°C`
* Sanitização de CPF utilizando expressões regulares
* Validação estrutural de Pressão Arterial
* Restrição de sinais vitais biologicamente impossíveis

Toda regra crítica é centralizada:

* Na camada ORM (`models.py`)
* Nas views da API
* Em validadores customizados

---

## 🚀 Otimização de Performance

A aplicação utiliza otimizações nativas da ORM do Django para evitar gargalos de consultas.

---

# 🛠️ Stack Tecnológica

| Tecnologia     | Finalidade                             |
| -------------- | -------------------------------------- |
| Python 3.14+   | Linguagem principal                    |
| Django 6.0+    | Framework backend                      |
| PostgreSQL     | Banco de dados relacional              |
| Python-Environ | Gerenciamento de variáveis de ambiente |
| JSON           | Comunicação entre cliente e servidor   |

---

# 📂 Estrutura do Projeto

```text
SistemaTriagem/
│
├── SistemaTriagem/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── atendimentos/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│
├── usuarios/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│
├── manage.py
└── .env
```

---

# 🔗 Endpoints da API

## 🔐 Autenticação

| Método | Endpoint            | Descrição                              | Acesso      |
| ------ | ------------------- | -------------------------------------- | ----------- |
| POST   | `/api/auth/login/`  | Autentica o profissional e cria sessão | Público     |
| POST   | `/api/auth/logout/` | Encerra sessão ativa                   | Autenticado |

---

## 🏥 Triagens e Fluxo Clínico

| Método | Endpoint                 | Descrição                                    | Acesso               |
| ------ | ------------------------ | -------------------------------------------- | -------------------- |
| GET    | `/api/triagens/`         | Retorna fila ordenada por prioridade clínica | Enfermeiro / Técnico |
| GET    | `/api/triagens/?cpf=...` | Filtra triagens por CPF                      | Enfermeiro / Técnico |
| POST   | `/api/triagens/`         | Registra nova triagem                        | Enfermeiro / Técnico |

---

## 👤 Pacientes

| Método | Endpoint               | Descrição                       | Acesso      |
| ------ | ---------------------- | ------------------------------- | ----------- |
| POST   | `/api/pacientes/`      | Cadastra novo paciente          | Autenticado |
| PUT    | `/api/pacientes/<id>/` | Atualiza cadastro do paciente   | Autenticado |
| DELETE | `/api/pacientes/<id>/` | Remove paciente permanentemente | Autenticado |

---

# ⚙️ Configuração do Ambiente

## 1️⃣ Clonar o Repositório

```bash
git clone (https://github.com/EmillyDelf/TriagemHospitalar)
cd SistemaTriagem
```

---

## 2️⃣ Criar Ambiente Virtual

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3️⃣ Instalar Dependências

```bash
pip install -r requirements.txt
```

---

# 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DEBUG=True

SECRET_KEY=sua_chave_secreta

DB_NAME=nome_do_banco
DB_USER=usuario_postgres
DB_PASSWORD=senha_postgres
DB_HOST=127.0.0.1
DB_PORT=5432

ALLOWED_HOSTS=*,localhost,127.0.0.1
```

---

# 🗄️ Banco de Dados

## Executar Migrações

```bash
python manage.py makemigrations usuarios
python manage.py makemigrations atendimentos

python manage.py migrate
```

---

# ▶️ Executando o Servidor

```bash
python manage.py runserver
```

Servidor disponível em:

```text
http://127.0.0.1:8000/
```

---

# 🔌 Integração com Frontend (React / Vue)

Para aplicações SPA utilizando autenticação baseada em sessão, é obrigatório enviar cookies de credenciais em todas as requisições.

## Exemplo com Axios

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

export default api;
```

---

# 🧪 Exemplo de Payload JSON

## Cadastro de Paciente

```json
{
  "nome": "Maria da Silva",
  "cpf": "12345678900",
  "idade": 42,
  "sexo": "F"
}
```

---

## Registro de Triagem

```json
{
  "paciente_id": 1,
  "temperatura": 37.5,
  "pressao_arterial": "120x80",
  "frequencia_cardiaca": 88,
  "prioridade": "LARANJA"
}
```

---

# 📌 Funcionalidades Implementadas

* ✅ Cadastro de pacientes
* ✅ Sistema de autenticação
* ✅ Controle de sessão
* ✅ Controle de permissões RBAC
* ✅ Triagem clínica
* ✅ Ordenação automática por prioridade
* ✅ Validação de sinais vitais
* ✅ Sanitização de CPF
* ✅ API RESTful JSON
* ✅ Persistência PostgreSQL
* ✅ Proteção contra dados inválidos
* ✅ Otimização de consultas ORM

---

# 🔒 Segurança

O projeto implementa múltiplas camadas de proteção:

* Validação de autenticação
* Controle de sessão
* Verificação de permissões
* Sanitização de entradas
* Proteção ORM contra SQL Injection
* Validação fisiológica de dados médicos
* Tratamento de payloads inválidos

---

# 👨‍💻 Autor

Desenvolvido para fins acadêmicos, estudo avançado de backend e demonstração de domínio em:

* Engenharia Backend
* APIs RESTful
* Django Internals
* PostgreSQL
* Segurança de aplicações
* Arquitetura desacoplada
* Sistemas hospitalares

---
