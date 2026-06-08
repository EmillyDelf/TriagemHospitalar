from django.urls import path
from . import views

urlpatterns = [
    # Rotas da Triagem
    path('api/triagens/', views.TriagemListCreateAPI.as_view(), name='api_triagens'),
    
    # Rotas da Prioridade
    path('api/prioridades/', views.PrioridadeListAPI.as_view(), name='api_prioridades'),
    
    # Rotas do Paciente (Listar e Criar)
    path('api/pacientes/', views.PacienteListCreateAPI.as_view(), name='api_pacientes_root'),
    
    # Rotas do Paciente por Identificador Único - Edição (PUT) e Exclusão (DELETE)
    path('api/pacientes/<int:pk>/', views.PacienteAPI.as_view(), name='api_pacientes_detail'),
]