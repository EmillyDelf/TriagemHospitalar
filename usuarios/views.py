import json
import re
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Usuario


# API responsável pela autenticação dos profissionais do sistema.
@method_decorator(csrf_exempt, name='dispatch')
class LoginAPIView(View):
    """
    Endpoint nativo para autenticação no padrão API REST.
    Recebe as credenciais via payload JSON e estabelece a sessão.
    """

    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            username = body.get('username')
            password = body.get('password')
            cpf_profissional = re.sub(r'\D', '', str(body.get('cpf_profissional', '') or ''))
            registro_profissional = str(body.get('registro_profissional', '') or '').strip()

            user = None

            # Mantém o login tradicional do Django, caso seja necessário.
            if username and password:
                user = authenticate(request, username=username, password=password)

            # Fluxo principal do sistema: autenticação por CPF e COREN.
            elif cpf_profissional and registro_profissional:
                try:
                    user = Usuario.objects.get(
                        cpf_profissional=cpf_profissional,
                        registro_profissional=registro_profissional,
                        tipo__in=['E', 'T'],
                    )
                except Usuario.DoesNotExist:
                    user = None
            else:
                return JsonResponse({"erro": "Parâmetros ausentes para login."}, status=400)

            if user is not None:

                # Impede autenticação de contas desativadas.
                if user.is_active:

                    # Cria a sessão autenticada e associa o usuário à requisição.
                    login(request, user)

                    return JsonResponse({
                        "mensagem": "Autenticação realizada com sucesso.",
                        "usuario": {
                            "username": user.username,
                            "email": user.email,
                            "tipo": user.tipo,
                            "cpf_profissional": user.cpf_profissional,
                            "registro_profissional": user.registro_profissional,
                        }
                    }, status=200)

                else:
                    return JsonResponse({"erro": "Esta conta de profissional está inativa."}, status=403)

            else:
                return JsonResponse({"erro": "Credenciais inválidas. Usuário ou senha incorretos."}, status=401)

        except Exception as e:
            return JsonResponse({"erro": f"Falha interna no processamento do payload: {str(e)}"}, status=400)


# API que verifica se o profissional está cadastrado e autorizado no sistema.
@method_decorator(csrf_exempt, name='dispatch')
class VerifyProfessionalAPIView(View):
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            cpf_profissional = re.sub(r'\D', '', str(body.get('cpf_profissional', '') or ''))
            registro_profissional = str(body.get('registro_profissional', '') or '').strip()

            if not cpf_profissional or not registro_profissional:
                return JsonResponse({"erro": "CPF e COREN são obrigatórios para o login."}, status=400)

            try:
                usuario = Usuario.objects.get(
                    cpf_profissional=cpf_profissional,
                    registro_profissional=registro_profissional,
                    tipo__in=['E', 'T'],
                    is_active=True
                )
            except Usuario.DoesNotExist:
                return JsonResponse({"erro": "Credenciais inválidas. Profissional não cadastrado ou dados incorretos."}, status=401)

            return JsonResponse({
                "mensagem": "Profissional autenticado com sucesso.",
                "usuario": {
                    "username": usuario.username,
                    "tipo": usuario.tipo
                }
            }, status=200)

        except Exception as e:
            return JsonResponse({"erro": f"Falha interna no processamento do payload: {str(e)}"}, status=400)


# API responsável pelo encerramento da sessão autenticada.
@method_decorator(csrf_exempt, name='dispatch')
class LogoutAPIView(View):
    """Endpoint para destruição da sessão ativa do profissional."""

    def post(self, request, *args, **kwargs):

        # Remove a sessão atual do usuário autenticado.
        logout(request)

        return JsonResponse({"mensagem": "Sessão encerrada com sucesso."}, status=200)