from django.core.management.base import BaseCommand
# Comando para popular o banco de dados com dados de teste usando a biblioteca Faker.
from faker import Faker
from usuarios.models import Usuario
from atendimentos.models import Paciente, Prioridade, Triagem
import random

fake = Faker('pt_BR')


class Command(BaseCommand):
    help = "Popula o banco com dados de teste"

    def handle(self, *args, **kwargs):

        self.stdout.write("Criando prioridades...")

        prioridades = [
            Prioridade.objects.get_or_create(
                nome_prioridade="Vermelho",
                defaults={"tempo_estimado": 0}
            )[0],
            Prioridade.objects.get_or_create(
                nome_prioridade="Laranja",
                defaults={"tempo_estimado": 10}
            )[0],
            Prioridade.objects.get_or_create(
                nome_prioridade="Amarelo",
                defaults={"tempo_estimado": 60}
            )[0],
            Prioridade.objects.get_or_create(
                nome_prioridade="Verde",
                defaults={"tempo_estimado": 120}
            )[0],
            Prioridade.objects.get_or_create(
                nome_prioridade="Azul",
                defaults={"tempo_estimado": 240}
            )[0],
        ]

        self.stdout.write("Criando usuários...")

        usuarios = []

        for i in range(1, 11):
            usuario, _ = Usuario.objects.get_or_create(
                username=f"usuario{i}",
                defaults={
                    "tipo": random.choice(["E", "T", "A"]),
                    "cpf_profissional": str(10000000000 + i),
                    "registro_profissional": f"REG{i:04d}"
                }
            )

            usuario.set_password("123456")
            usuario.save()

            usuarios.append(usuario)

        self.stdout.write("Criando pacientes...")

        pacientes = []

        for i in range(1, 11):
            paciente, _ = Paciente.objects.get_or_create(
                cpf_paciente=str(20000000000 + i),
                defaults={
                    "nome_paciente": fake.name(),
                    "data_nascimento": fake.date_of_birth(
                        minimum_age=18,
                        maximum_age=90
                    )
                }
            )

            pacientes.append(paciente)

        self.stdout.write("Criando triagens...")

        for i in range(10):
            Triagem.objects.create(
                paciente=random.choice(pacientes),
                profissional=random.choice(usuarios),
                prioridade=random.choice(prioridades),
                pressao_arterial=f"{random.randint(10,14)}0/{random.randint(6,9)}0",
                temperatura=round(random.uniform(35.5, 39.5), 1),
                frequencia_cardiaca=random.randint(60, 120),
                observacoes=fake.text(max_nb_chars=100)
            )

        self.stdout.write(
            self.style.SUCCESS("Banco populado com sucesso!")
        )