from django.contrib import admin
from .models import Paciente, Triagem, Prioridade

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('nome_paciente', 'cpf_paciente', 'data_nascimento')
    search_fields = ('nome_paciente', 'cpf_paciente')

@admin.register(Triagem)
class TriagemAdmin(admin.ModelAdmin):
    list_display = ('paciente', 'prioridade', 'temperatura', 'pressao_arterial', 'data_hora')
    list_filter = ('prioridade', 'data_hora')
    search_fields = ('paciente__nome_paciente',)

admin.site.register(Prioridade)