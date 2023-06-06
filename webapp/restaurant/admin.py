from django.contrib import admin

from .models import Restaurant, ItemCategory, Item
from table.admin import TableInline


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'formatted_cnpj', 'formatted_phone', 'city', 'state',)
    list_filter = ('state',)
    search_fields = ('name', 'phone_number', 'cnpj')
    inlines = [TableInline]


@admin.register(ItemCategory)
class ItemCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'sort_order', 'restaurant')
    list_filter = ('name', 'restaurant',)
    search_fields = ('name',)


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'category', 'price', 'restaurant',)
    list_filter = ('category', 'restaurant',)
    search_fields = ('name', 'category',)
