from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError


# Armazena os dados cadastrais básicos dos pacientes.
class Paciente(models.Model):
    nome_paciente = models.CharField(max_length=200)

    # CPF único para evitar duplicidade de cadastro.
    cpf_paciente = models.CharField(max_length=11, unique=True)

    data_nascimento = models.DateField()
    
    def __str__(self):
        return self.nome_paciente


# Representa os níveis de prioridade da triagem.
# Ex.: Verde, Amarelo e Vermelho.
class Prioridade(models.Model):
    nome_prioridade = models.CharField(max_length=20)

    # Tempo estimado para atendimento em minutos.
    tempo_estimado = models.IntegerField(help_text="Minutos para atendimento")
    
    def __str__(self):
        return self.nome_prioridade


# Registra a avaliação inicial realizada durante a triagem.
# Este modelo concentra os sinais vitais e a classificação de risco.
class Triagem(models.Model):

    # Paciente submetido à triagem.
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)

    # Profissional responsável pelo registro.
    profissional = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    # Prioridade atribuída após avaliação.
    prioridade = models.ForeignKey(Prioridade, on_delete=models.SET_NULL, null=True)
    
    # Pressão arterial registrada no momento da triagem.
    pressao_arterial = models.CharField(max_length=10)

    # Data e horário de criação do registro.
    data_hora = models.DateTimeField(auto_now_add=True)

    # Observações complementares do profissional.
    observacoes = models.TextField(blank=True)

    # Temperatura corporal validada dentro de limites aceitáveis.
    temperatura = models.DecimalField(
        max_digits=4, 
        decimal_places=1,
        validators=[MinValueValidator(30.0), MaxValueValidator(45.0)]
    )
    
    # Frequência cardíaca em batimentos por minuto (BPM).
    frequencia_cardiaca = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(300)]
    )

    class Meta:
        # Exibe as triagens mais recentes primeiro.
        ordering = ['-data_hora']

        verbose_name_plural = "Triagens"

    def __str__(self):
        return f"Triagem: {self.paciente.nome_paciente}"