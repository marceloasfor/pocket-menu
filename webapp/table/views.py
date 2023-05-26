from django.http import HttpRequest, HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect

from .models import Table
from restaurant.models import Restaurant

@login_required
def available_tables(request: HttpRequest, restaurant_id: int) -> HttpResponse:
    restaurant = Restaurant.objects.get(id=restaurant_id)
    return render(request, 'available_tables.html', {'restaurant': restaurant})

@login_required
def table_info(request: HttpRequest, restaurant_id: int, table_id: int) -> HttpResponse:
    table = Table.objects.get(id=table_id)
    context = {
        'table': table,
        'table_id': table_id,
        'restaurant_id': restaurant_id
    }
    return render(request, 'table_info.html', context=context)

@login_required
def request_entry(request: HttpRequest, restaurant_id: int, table_id: int) -> HttpResponse:
    table = Table.objects.get(id=table_id)
    if request.user in table.users.all() or not table.available:
        return redirect('table_info', restaurant_id=restaurant_id, table_id=table_id)

    # FIXME: Implementar lógica p/ solicitar entrada, inverter 'available' (True -> False), adicionar o usuario em 'users' e diminuir 'capacity'.
    return redirect('available_tables', restaurant_id=restaurant_id)

