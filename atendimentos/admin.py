from django.contrib import admin
from .models import Paciente, Triagem, Prioridade

admin.site.register(Paciente)
admin.site.register(Triagem)
admin.site.register(Prioridade)