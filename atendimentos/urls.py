from django.urls import path
from .views import TriagemListView, TriagemCreateView, PacienteCreateView

urlpatterns = [
    path('', TriagemListView.as_view(), name='triagem_list'),
    path('triagens/nova/', TriagemCreateView.as_view(), name='triagem_create'),
    path('pacientes/novo/', PacienteCreateView.as_view(), name='paciente_create'),
]