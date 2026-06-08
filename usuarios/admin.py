from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario


# Personaliza a administração dos profissionais de saúde no Django Admin.
@admin.register(Usuario)
class CustomUserAdmin(UserAdmin):
    """
    Configuração do painel administrativo para o modelo Usuario.
    """

    # Colunas exibidas na listagem principal.
    list_display = ('username', 'email', 'tipo', 'is_staff', 'is_active')

    # Filtros disponíveis na barra lateral.
    list_filter = ('tipo', 'is_staff', 'is_superuser', 'is_active')

    # Campos utilizados na pesquisa de usuários.
    search_fields = ('username', 'email', 'registro_profissional')

    # Campos adicionais exibidos na edição de usuários.
    fieldsets = UserAdmin.fieldsets + (
        ('Informações Hospitalares', {
            'fields': ('tipo', 'cpf_profissional', 'registro_profissional')
        }),
    )

    # Campos adicionais exibidos no cadastro de novos usuários.
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Informações Hospitalares', {
            'fields': ('tipo', 'cpf_profissional', 'registro_profissional'),
        }),
    )