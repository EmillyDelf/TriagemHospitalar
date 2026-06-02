from django.contrib.auth.models import AbstractUser
from django.db import models


# Modelo de usuário do sistema hospitalar.
# Utilizado para autenticação e controle de permissões dos profissionais.
class Usuario(AbstractUser):
    """
    Extensão do modelo User padrão do Django.
    Representa o profissional de saúde autenticado no sistema hospitalar.
    """

    # Perfis disponíveis para acesso ao sistema.
    TIPOS = (
        ('E', 'Enfermeiro'),
        ('T', 'Tecnico de Enfermagem'),
        ('A', 'Administrador'),
    )

    # Define o perfil do usuário e suas permissões no sistema.
    # Mantido como 'tipo' para compatibilidade com as regras de acesso das APIs.
    tipo = models.CharField(max_length=1, choices=TIPOS, default='E')

    # CPF do profissional para identificação cadastral.
    cpf_profissional = models.CharField(max_length=11, unique=True, null=True, blank=True)

    # Registro profissional (COREN, CRM ou equivalente).
    registro_profissional = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        # Exibe usuário e perfil em listagens administrativas.
        return f"{self.username} ({self.get_tipo_display()})"