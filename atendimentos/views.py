import json
import re
from django.views import View
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.db.models import Case, When, IntegerField
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Triagem, Paciente


# API responsável pela consulta da fila de triagem e cadastro de novas triagens.
# O acesso é restrito aos perfis autorizados pelo sistema.
@method_decorator(csrf_exempt, name='dispatch')
class TriagemListCreateAPI(LoginRequiredMixin, UserPassesTestMixin, View):
    """
    Endpoint para controle da Fila de Espera por prioridade (GET)
    e inserção de novas Triagens (POST).
    """

    # Permite acesso apenas para usuários dos tipos E (de enfermeiro) e T(de tecnico em enfermagem).
    def test_func(self):
        return self.request.user.tipo in ['E', 'T']

    def get(self, request, *args, **kwargs):

        # Carrega paciente e prioridade juntamente com a triagem,
        # reduzindo consultas adicionais ao banco de dados.
        queryset = Triagem.objects.select_related('paciente', 'prioridade')

        # Permite filtrar a fila pelo CPF do paciente.
        cpf = request.GET.get('cpf')
        if cpf:
            cpf_limpo = re.sub(r'\D', '', cpf)
            queryset = queryset.filter(paciente__cpf_paciente=cpf_limpo)

        # Ordenação da fila conforme o Protocolo de Manchester.
        # Primeiro pela prioridade clínica e depois pelo horário
        # de cadastro da triagem.
        triagens_filtradas = queryset.annotate(
            prioridade_ordem=Case(
                When(prioridade__nome_prioridade__icontains='Vermelho', then=1),
                When(prioridade__nome_prioridade__icontains='Laranja', then=2),
                When(prioridade__nome_prioridade__icontains='Amarelo', then=3),
                When(prioridade__nome_prioridade__icontains='Verde', then=4),
                When(prioridade__nome_prioridade__icontains='Azul', then=5),
                output_field=IntegerField(),
            )
        ).order_by('prioridade_ordem', 'data_hora')

        # Serialização manual dos dados para resposta JSON.
        dados = []
        for t in triagens_filtradas:
            dados.append({
                "id": t.id,
                "paciente": {
                    "id": t.paciente.id,
                    "nome": t.paciente.nome_paciente,
                    "cpf": t.paciente.cpf_paciente,
                },
                "prioridade": t.prioridade.nome_prioridade if t.prioridade else None,
                "pressao_arterial": t.pressao_arterial,
                "temperatura": float(t.temperatura) if t.temperatura else None,
                "frequencia_cardiaca": t.frequencia_cardiaca,
                "observacoes": t.observacoes,
                "data_hora": t.data_hora.isoformat()
            })

        return JsonResponse({"triagens": dados}, status=200)

    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)

            # Validação clínica básica da temperatura corporal.
            temp = float(body.get('temperatura', 0))
            if temp < 30.0 or temp > 45.0:
                return JsonResponse({"erro": "Parâmetro Inválido: Temperatura fora do limite clínico viável."}, status=400)

            # Validação do formato da pressão arterial.
            pressao = body.get('pressao_arterial', '')
            if '/' not in pressao:
                return JsonResponse({"erro": "Parâmetro Inválido: Formato de pressão arterial incorreto. Use o padrão '/'."}, status=400)

            # Criação do registro de triagem associado ao profissional logado.
            triagem = Triagem.objects.create(
                paciente_id=body.get('paciente'),
                prioridade_id=body.get('prioridade'),
                pressao_arterial=pressao,
                temperatura=temp,
                frequencia_cardiaca=int(body.get('frequencia_cardiaca', 0)),
                observacoes=body.get('observacoes', ''),
                profissional=request.user
            )

            return JsonResponse({"mensagem": "Triagem computada com sucesso.", "id": triagem.id}, status=201)

        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)


# API responsável pelas operações de cadastro, edição e exclusão
# de pacientes do sistema hospitalar.
@method_decorator(csrf_exempt, name='dispatch')
class PacienteAPI(LoginRequiredMixin, View):
    """
    Endpoint Unificado para o CRUD REST total do Paciente.
    Trata de forma nativa POST (Criar), PUT (Editar) e DELETE (Excluir).
    """

    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)

            # Remove caracteres não numéricos antes da validação.
            cpf_limpo = re.sub(r'\D', '', body.get('cpf_paciente', ''))

            # Validação mínima de tamanho do CPF.
            if len(cpf_limpo) != 11:
                return JsonResponse({"erro": "Erro Cadastral: CPF inválido. Certifique-se de enviar 11 dígitos."}, status=400)

            paciente = Paciente.objects.create(
                nome_paciente=body.get('nome_paciente'),
                cpf_paciente=cpf_limpo,
                data_nascimento=body.get('data_nascimento')
            )

            return JsonResponse({"mensagem": "Paciente registrado.", "id": paciente.id}, status=201)

        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)

    def put(self, request, pk, *args, **kwargs):
        try:
            paciente = Paciente.objects.get(pk=pk)
            body = json.loads(request.body)

            cpf_bruto = body.get('cpf_paciente', paciente.cpf_paciente)
            cpf_limpo = re.sub(r'\D', '', cpf_bruto)

            # Garante que o CPF permaneça válido após alterações.
            if len(cpf_limpo) != 11:
                return JsonResponse({"erro": "Erro Cadastral: O CPF para modificação precisa ter 11 dígitos."}, status=400)

            paciente.nome_paciente = body.get('nome_paciente', paciente.nome_paciente)
            paciente.cpf_paciente = cpf_limpo
            paciente.data_nascimento = body.get('data_nascimento', paciente.data_nascimento)
            paciente.save()

            return JsonResponse({"mensagem": "Cadastro modificado com sucesso."}, status=200)

        except Paciente.DoesNotExist:
            return JsonResponse({"erro": "Registro não encontrado no banco PostgreSQL."}, status=404)

        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=400)

    def delete(self, request, pk, *args, **kwargs):
        try:
            # Exclusão permanente do cadastro do paciente.
            paciente = Paciente.objects.get(pk=pk)
            paciente.delete()

            return JsonResponse({"mensagem": "Paciente deletado do sistema de forma permanente."}, status=200)

        except Paciente.DoesNotExist:
            return JsonResponse({"erro": "Registro não encontrado no banco PostgreSQL."}, status=404)