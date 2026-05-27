from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    """
    Extensão do modelo User padrão do Django.
    Representa o profissional de saúde autenticado no sistema hospitalar.
    """
    TIPOS = (
        ('E', 'Enfermeiro'),
        ('T', 'Tecnico de Enfermagem'),
        ('A', 'Administrador'),
    )
    
    # ALINHAMENTO: Modificado de 'tipo_profissional' para 'tipo'
    # para compatibilidade estrita com o método test_func() da API.
    tipo = models.CharField(max_length=1, choices=TIPOS, default='E')
    
    cpf_profissional = models.CharField(max_length=11, unique=True, null=True, blank=True)
    registro_profissional = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.get_tipo_display()})"