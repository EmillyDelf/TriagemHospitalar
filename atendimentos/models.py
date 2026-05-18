from django.db import models
from django.conf import settings
#verificação contra firula
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError

class Paciente(models.Model):
    nome = models.CharField(max_length=200)
    cpf = models.CharField(max_length=11, unique=True)
    data_nascimento = models.DateField()
    
    def __str__(self):
        return self.nome

class Prioridade(models.Model):
    nome = models.CharField(max_length=20) # Ex: Verde, Amarelo, Vermelho
    tempo_estimado = models.IntegerField(help_text="Minutos para atendimento")
    
    def __str__(self):
        return self.nome

class Triagem(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    profissional = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    prioridade = models.ForeignKey(Prioridade, on_delete=models.SET_NULL, null=True)
    
    pressao_arterial = models.CharField(max_length=10)
    temperatura = models.DecimalField(max_digits=4, decimal_places=1)
    frequencia_cardiaca = models.IntegerField()
    data_hora = models.DateTimeField(auto_now_add=True)
    observacoes = models.TextField(blank=True)

    class Meta:
        ordering = ['-data_hora']
        verbose_name_plural = "Triagens"

    # Validação: Temperatura humana viável entre 30°C e 45°C
    temperatura = models.DecimalField(
        max_digits=4, 
        decimal_places=1,
        validators=[MinValueValidator(30.0), MaxValueValidator(45.0)]
    )
    
    # Validação: Frequência cardíaca
    frequencia_cardiaca = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(300)]
    )

    # Validação customizada para Pressão Arterial (deve conter um '/')
    def clean(self):
        if '/' not in self.pressao_arterial:
            raise ValidationError({
                'pressao_arterial': "A pressão deve estar no formato '12/8' ou '120/80'."
            })