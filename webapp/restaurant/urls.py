from django.urls import path

from .views import index, show_tables

urlpatterns = [
    path('available_restaurants', index, name='available_restaurants'),
    path('tables/<int:restaurant_id>/', show_tables, name='show_tables')
]