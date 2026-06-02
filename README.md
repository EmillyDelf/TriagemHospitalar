# 🏥 Sistema de Triagem Hospitalar

API RESTful desenvolvida com Django e PostgreSQL para gerenciamento de pacientes e triagem hospitalar baseada no Protocolo de Manchester.

## Sobre o Projeto

O sistema foi desenvolvido utilizando Django com arquitetura backend desacoplada, fornecendo endpoints HTTP para autenticação, cadastro de pacientes e gerenciamento da fila de triagem.

A classificação dos pacientes segue os níveis de prioridade do Protocolo de Manchester, permitindo que a fila seja ordenada automaticamente conforme a gravidade clínica.

## Tecnologias Utilizadas

* Python
* Django
* PostgreSQL
* JSON
* Python-Environ

## Arquitetura

A API foi construída utilizando recursos nativos do Django, sem utilização do Django REST Framework.

Principais componentes:

* Models para persistência dos dados
* Views baseadas em classes (`View`)
* ORM nativa do Django
* Respostas JSON com `JsonResponse`
* Sistema de autenticação e sessão do Django

## Funcionalidades

### Autenticação

* Login de profissionais
* Logout de sessão
* Controle de acesso baseado em perfil

Perfis disponíveis:

* Enfermeiro
* Técnico de Enfermagem
* Administrador

### Pacientes

* Cadastro de pacientes
* Atualização de dados cadastrais
* Exclusão de pacientes

### Triagem

* Registro de triagens
* Associação entre paciente e profissional responsável
* Registro de sinais vitais
* Classificação por prioridade clínica
* Consulta da fila de atendimento
* Busca de pacientes por CPF

## Ordenação da Fila

A fila é ordenada dinamicamente conforme a prioridade atribuída durante a triagem:

1. Vermelho
2. Laranja
3. Amarelo
4. Verde
5. Azul

Dentro de cada prioridade, o atendimento respeita a ordem cronológica de cadastro da triagem.

## Validações Implementadas

* CPF sanitizado antes da persistência
* Temperatura limitada entre 30°C e 45°C
* Validação básica do formato da pressão arterial
* Controle de acesso para operações restritas

## Estrutura do Projeto

```text
SistemaTriagem/
│
├── atendimentos/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── usuarios/
│   ├── models.py
│   ├── views.py
│   └── admin.py
│
├── SistemaTriagem/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
└── manage.py
```

## Endpoints

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

## Execução

```bash
python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

## Possíveis Evoluções

O projeto foi desenvolvido utilizando Django nativo e pode ser expandido futuramente com:

* Django REST Framework
* Autenticação JWT
* Paginação de resultados
* Documentação automática (Swagger/OpenAPI)
* Logs e auditoria clínica

Essas melhorias permitiriam que a aplicação suportasse cenários com maior volume de usuários e integrações externas.
