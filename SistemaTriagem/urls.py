from django.contrib import admin
from django.urls import path, include
from usuarios.views import LoginAPIView, LogoutAPIView, VerifyProfessionalAPIView

urlpatterns = [
    # Painel administrativo mantido para gerenciamento e auditoria de dados
    path('admin/', admin.site.urls),

    # Endpoints de Autenticação Puros em JSON (Substituindo o MVT antigo)
    path('api/auth/login/', LoginAPIView.as_view(), name='api_login'),
    path('api/auth/verify-professional/', VerifyProfessionalAPIView.as_view(), name='api_verify_professional'),
    path('api/auth/logout/', LogoutAPIView.as_view(), name='api_logout'),

    # Acoplamento das rotas de negócio (Pacientes e Triagens)
    path('', include('atendimentos.urls')),
]