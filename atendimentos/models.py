from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError

class Paciente(models.Model):
    nome_paciente = models.CharField(max_length=200)
    cpf_paciente = models.CharField(max_length=11, unique=True)
    data_nascimento = models.DateField()
    
    def __str__(self):
        return self.nome_paciente


class Prioridade(models.Model):
    nome_prioridade = models.CharField(max_length=20)  # Ex: Verde, Amarelo, Vermelho
    tempo_estimado = models.IntegerField(help_text="Minutos para atendimento")
    
    def __str__(self):
        return self.nome_prioridade


class Triagem(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    profissional = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    prioridade = models.ForeignKey(Prioridade, on_delete=models.SET_NULL, null=True)
    
    pressao_arterial = models.CharField(max_length=10)
    data_hora = models.DateTimeField(auto_now_add=True)
    observacoes = models.TextField(blank=True)

    temperatura = models.DecimalField(
        max_digits=4, 
        decimal_places=1,
        validators=[MinValueValidator(30.0), MaxValueValidator(45.0)]
    )
    
    frequencia_cardiaca = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(300)]
    )

    class Meta:
        ordering = ['-data_hora']
        verbose_name_plural = "Triagens"

    def __str__(self):
        return f"Triagem: {self.paciente.nome_paciente}"