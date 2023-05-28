from django.urls import path

from .views import available_tables, table_info, request_entry, exit_table

# FIXME: Alterar <int:restaurant_id> para <str:restaurant_name>
urlpatterns = [
    path('tables/<int:restaurant_id>/', available_tables, name='available_tables'),
    path('tables/<int:restaurant_id>/table_info/<int:table_id>/', table_info, name='table_info'),
    path('tables/<int:restaurant_id>/table/<int:table_id>/request-entry/', request_entry, name='request_entry'),
    path('tables/<int:restaurant_id>/table/<int:table_id>/exit-table/', exit_table, name='exit_table')
]