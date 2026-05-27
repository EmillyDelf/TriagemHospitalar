from django.urls import path
from . import views

urlpatterns = [
    # Rotas da Triagem
    path('api/triagens/', views.TriagemListCreateAPI.as_view(), name='api_triagens'),
    
    # Rotas do Paciente (Criar)
    path('api/pacientes/', views.PacienteAPI.as_view(), name='api_pacientes_root'),
    
    # Rotas do Paciente por Identificador Único - Edição (PUT) e Exclusão (DELETE)
    path('api/pacientes/<int:pk>/', views.PacienteAPI.as_view(), name='api_pacientes_detail'),
]