from django.urls import path

from .views import available_tables, table_info, request_entry

urlpatterns = [
    path('tables/<int:restaurant_id>/', available_tables, name='available_tables'),
    path('tables/<int:restaurant_id>/table_info/<int:table_id>/', table_info, name='table_info'),
    path('tables/<int:restaurant_id>/table/<int:table_id>/request-entry/', request_entry, name='request_entry')
]