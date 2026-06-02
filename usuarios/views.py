import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


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

            # Validação dos campos obrigatórios para login.
            if not username or not password:
                return JsonResponse({"erro": "Parâmetros ausentes: Usuário e senha são obrigatórios."}, status=400)

            # Valida as credenciais contra a tabela de usuários do sistema.
            user = authenticate(request, username=username, password=password)

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
                            "tipo": user.tipo
                        }
                    }, status=200)

                else:
                    return JsonResponse({"erro": "Esta conta de profissional está inativa."}, status=403)

            else:
                return JsonResponse({"erro": "Credenciais inválidas. Usuário ou senha incorretos."}, status=401)

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