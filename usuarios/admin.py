from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

@admin.register(Usuario)
class CustomUserAdmin(UserAdmin):
    """
    Configuração avançada para o modelo de Usuário customizado (Profissional de Saúde).
    Adapta a interface do Django Admin para expor as propriedades hospitalares.
    """
    # Colunas que serão exibidas na tabela principal de listagem
    # ALINHAMENTO: Substituído 'tipo_profissional' por 'tipo' para bater com as views
    list_display = ('username', 'email', 'tipo', 'is_staff', 'is_active')
    
    # Filtros laterais para segmentação rápida na gestão do hospital
    list_filter = ('tipo', 'is_staff', 'is_superuser', 'is_active')
    
    # Permite buscar profissionais por nome de usuário, e-mail ou registro do conselho
    search_fields = ('username', 'email', 'registro_profissional')
    
    # Campos exibidos na tela de EDIÇÃO de um usuário existente
    fieldsets = UserAdmin.fieldsets + (
        ('Informações Hospitalares', {
            'fields': ('tipo', 'cpf_profissional', 'registro_profissional')
        }),
    )

    # Campos exibidos na tela de CRIAÇÃO de um novo usuário profissional
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Informações Hospitalares', {
            'fields': ('tipo', 'cpf_profissional', 'registro_profissional'),
        }),
    )