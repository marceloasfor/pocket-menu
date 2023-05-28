from django.contrib import admin

from .models import Restaurant
from table.admin import TableInline

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'formatted_cnpj', 'formatted_phone', 'city', 'state',)
    list_filter = ('state',)
    search_fields = ('name', 'phone_number', 'cnpj')
    inlines = [TableInline]
