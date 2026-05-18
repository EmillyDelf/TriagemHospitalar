from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    TIPOS = (
        ('E', 'Enfermeiro'),
        ('T', 'Tecnico de Enfermagem'),
        ('A', 'Administrador'),
    )
    tipo = models.CharField(max_length=1, choices=TIPOS, default='E')
    cpf = models.CharField(max_length=11, unique=True, null=True, blank=True)
    registro_profissional = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.get_tipo_display()})"