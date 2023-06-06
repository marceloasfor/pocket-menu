import json

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from restaurant.models import Restaurant
from .models import Table
from .serializers import TableSerializer


class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [permissions.AllowAny]
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['restaurant']

    def get_queryset(self):
        restaurant = self.request.query_params.get('restaurant', 0)
        try:
            restaurant = int(restaurant)
        except Exception as e:
            raise(e)

        if restaurant:
            self.queryset = self.queryset.filter(restaurant=restaurant)

        number = self.request.query_params.get('number', 0)
        if number:
            self.queryset = self.queryset.filter(number=number)

        return self.queryset


class UsersInTableList(APIView):
    def get(self, request, format=None):
        if not request.user.is_authenticated:
            # If not authenticated, we need a body param token
            verification_code = request.GET.get('verification_code')
            if not verification_code:
                return Response({'error': 'verification_code not provided'}, status=status.HTTP_403_FORBIDDEN)
            table = Table.objects.filter(verification_code=verification_code)
        else:
            # TODO need to fix rests authentication in order for this to work
            # right now request.user is not a user in DB
            table = Table.objects.filter(users__in=[request.user])

        data = []
        if table.exists():
            table = table[0]
            users_in_table = table.users.all()

            for user in users_in_table:
                context = {
                    'id': user.id,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                }
                data.append(context)
        return Response(data)

    def post(self, request, format=None):
        body = json.loads(request.body)
        verification_code = body.get('verification_code')
        if not verification_code:
            return Response({'error': 'verification_code not provided'}, status=status.HTTP_403_FORBIDDEN)

        table = Table.objects.filter(verification_code=verification_code)
        if not table.exists():
            return Response({'error': 'Table not found'}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_authenticated:
            username = body.get('username')
            if not username:
                return Response({'error': 'username not provided'}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.get_or_create(username=username)

            table[0].users.add(user[0].id)
            return Response({'verification_code': verification_code}, status=status.HTTP_201_CREATED)


@login_required
def available_tables(request: HttpRequest, restaurant_id: int) -> HttpResponse:
    """Mostra as mesas disponíveis de algum restaurante."""
    restaurant = Restaurant.objects.get(id=restaurant_id)
    return render(request, 'available_tables.html', {'restaurant': restaurant})

@login_required
def table_info(request: HttpRequest, restaurant_id: int, table_id: int) -> HttpResponse:
    """Mostra as informações de alguma mesa de algum restaurante."""
    table = Table.objects.get(id=table_id)
    context = {
        'table': table,
        'table_id': table_id,
        'restaurant_id': restaurant_id
    }
    return render(request, 'table_info.html', context=context)

@login_required
def request_entry(request: HttpRequest, restaurant_id: int, table_id: int) -> HttpResponse:
    """Adiciona um usuário autenticado a uma mesa, se possível."""
    table = get_object_or_404(Table, id=table_id)
    if request.user not in table.users.all() and table.available:
        if not check_user_in_table(request):
            table.available = False
            table.capacity -= 1
            table.users.add(request.user)
            table.save()
            messages.success(request, f"Você entrou na Mesa N° {table.number}")
            return redirect('available_tables', restaurant_id=restaurant_id)
        else:
            messages.info(request, "Você já está em uma Mesa!")
    elif not table.available:
        messages.info(request, f"A Mesa N° {table.number} não está disponível no momento!")
        return HttpResponse(f"A Mesa N° {table.number} não está disponível no momento!", status=405)
    elif request.user in table.users.all():
        messages.info(request, f"Você já está na Mesa N° {table.number}!")
    return redirect('table_info', restaurant_id=restaurant_id, table_id=table_id)

@login_required
def exit_table(request: HttpRequest, restaurant_id: int, table_id: int) -> HttpResponse:
    """Remove um usuário autenticado de uma mesa."""
    table = get_object_or_404(Table, id=table_id)
    if request.user in table.users.all():
        if check_user_in_table(request):
            table.capacity += 1
            table.users.remove(request.user)
            # Não tem mais ninguém na mesa.
            if not table.users.exists():
                table.available = True
            table.save()
            messages.success(request, f"Você saiu da Mesa N° {table_id}")
            return redirect('available_tables', restaurant_id=restaurant_id)

    messages.info(request, "Você não está em uma Mesa!")
    return redirect('available_tables', restaurant_id=restaurant_id)

# TODO: Implementar o pedido de entrada em uma mesa ocupada com vaga.
