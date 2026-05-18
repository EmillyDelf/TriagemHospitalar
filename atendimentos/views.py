from django.views.generic import ListView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.urls import reverse_lazy
from django.db.models import Case, When, IntegerField

from .models import Triagem, Paciente


class TriagemListView(LoginRequiredMixin, UserPassesTestMixin, ListView):
    model = Triagem
    template_name = 'atendimento/triagem_list.html'
    context_object_name = 'triagens'
    paginate_by = 10

    def test_func(self):
        return self.request.user.tipo in ['E', 'M']

    def get_queryset(self):

        queryset = Triagem.objects.select_related(
            'paciente',
            'prioridade'
        )

        cpf = self.request.GET.get('cpf')

        if cpf:
            queryset = queryset.filter(
                paciente__cpf=cpf
            )

        return queryset.annotate(
            prioridade_ordem=Case(
                When(prioridade__nome__icontains='Vermelho', then=1),
                When(prioridade__nome__icontains='Laranja', then=2),
                When(prioridade__nome__icontains='Amarelo', then=3),
                When(prioridade__nome__icontains='Verde', then=4),
                When(prioridade__nome__icontains='Azul', then=5),
                output_field=IntegerField(),
            )
        ).order_by('prioridade_ordem', 'data_hora')

class TriagemCreateView(LoginRequiredMixin, CreateView):
    model = Triagem
    fields = ['paciente', 'prioridade', 'pressao_arterial', 'temperatura', 'frequencia_cardiaca', 'observacoes']
    template_name = 'atendimento/triagem_form.html'
    success_url = reverse_lazy('triagem_list')

    def form_valid(self, form):
        # Associa sozin o profissional logado à triagem
        form.instance.profissional = self.request.user
        return super().form_valid(form)
    
class PacienteCreateView(LoginRequiredMixin, CreateView):
    model = Paciente
    fields = ['nome', 'cpf', 'data_nascimento']
    template_name = 'atendimento/paciente_form.html'
    success_url = reverse_lazy('triagem_create') # Após cadastrar, ce vai direto para a triagem