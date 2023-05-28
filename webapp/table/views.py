from django.contrib import messages
from django.http import HttpRequest, HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404

from .models import Table
from restaurant.models import Restaurant

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
def check_user_in_table(request: HttpRequest) -> bool:
    """Verifica se o usuário autenticado está em alguma mesa."""
    current_user = request.user
    user_in_table = Table.objects.filter(users=current_user).exists()
    return user_in_table

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
            messages.success(request, f"Você entou na Mesa N° {table_id}")
            return redirect('available_tables', restaurant_id=restaurant_id)
        else:
            messages.info(request, "Você já está em uma Mesa!")
    elif not table.available:
        messages.info(request, f"A Mesa N° {table_id} não está disponível no momento!")
    elif request.user in table.users.all():
        messages.info(request, f"Você já está na Mesa N° {table_id}!")
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