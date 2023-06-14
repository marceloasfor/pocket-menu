from django.urls import path

from . import views

urlpatterns = [
    path('available_restaurants', views.index, name='available_restaurants'),
    path('tables/<int:restaurant_id>/', views.show_tables, name='show_tables'),
]
