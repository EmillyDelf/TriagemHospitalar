export type UsuarioSessao = {
  username: string
  tipo: string
  cpf_profissional?: string | null
  registro_profissional?: string | null
}

export type LoginResponse = {
  mensagem: string
  usuario: UsuarioSessao
}

export type PacienteAPI = {
  id: number
  nome_paciente: string
  cpf_paciente: string
  data_nascimento: string
}

export type PrioridadeAPI = {
  id: number
  nome_prioridade: string
  tempo_estimado: number
}

export type TriagemAPI = {
  id: number
  paciente: {
    id: number
    nome: string
    cpf: string
  }
  prioridade: string | null
  pressao_arterial: string
  temperatura: number | null
  frequencia_cardiaca: number | null
  observacoes: string
  data_hora: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  let payload: any = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    throw new Error(payload?.erro || payload?.message || 'Falha na comunicação com a API.')
  }

  return payload as T
}

export function loginProfessional(cpf_profissional: string, registro_profissional: string) {
  return request<LoginResponse>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ cpf_profissional, registro_profissional }),
  })
}

export function logoutProfessional() {
  return request<{ mensagem: string }>('/auth/logout/', { method: 'POST' })
}

export function getPacientes() {
  return request<{ pacientes: PacienteAPI[] }>('/pacientes/', { method: 'GET' })
}

export function createPaciente(payload: {
  nome_paciente: string
  cpf_paciente: string
  data_nascimento: string
}) {
  return request<{ mensagem: string; id: number }>('/pacientes/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getPrioridades() {
  return request<{ prioridades: PrioridadeAPI[] }>('/prioridades/', { method: 'GET' })
}

export function getTriagens(cpf?: string) {
  const query = cpf ? `?cpf=${encodeURIComponent(cpf)}` : ''
  return request<{ triagens: TriagemAPI[] }>(`/triagens/${query}`, { method: 'GET' })
}

export function createTriagem(payload: {
  paciente: number
  prioridade: number
  pressao_arterial: string
  temperatura: number
  frequencia_cardiaca: number
  observacoes: string
}) {
  return request<{ mensagem: string; id: number }>('/triagens/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
