from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = Order.order_items.through
    extra = 0
    can_delete = True


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'table',)
    search_fields = ('table',)
    inlines = [OrderItemInline]