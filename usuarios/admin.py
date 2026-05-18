from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

class CustomUserAdmin(UserAdmin):
    # Campos que vão aparecer aí na LISTA de usuários (tabela principal)
    list_display = ('username', 'email', 'tipo', 'is_staff')
    
    # Campos que vão aparecer aí na tela de EDIÇÃO (detalhes do usuário)
    fieldsets = UserAdmin.fieldsets + (
        ('Informações Hospitalares', {'fields': ('tipo', 'cpf', 'registro_profissional')}),
    )

    # Campos que vão aparecer aí na tela de CRIAÇÃO (quando você clica em "Adicionar")
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Informações Hospitalares', {
            'fields': ('tipo', 'cpf', 'registro_profissional'),
        }),
    )

# Registra o modelo usando a nossa classe customizada
admin.site.register(Usuario, CustomUserAdmin)