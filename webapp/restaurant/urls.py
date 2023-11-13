from django.urls import path

from . import views

urlpatterns = [
    path('available_restaurants', views.index, name='available_restaurants'),
    path('tables/<int:restaurant_id>/', views.show_tables, name='show_tables'),
    path('orders_management/<int:restaurant_id>/', views.order_management, name='order-management'),
    path('restaurant_login', views.restaurant_login, name='restaurant-login'),

    # both are the same, but the first is the root url (i.e. localhost:8000
    # instead of localhost:8000/restaurant_select)
    path('', views.restaurant_select, name='restaurant-select'),
    path('restaurant_select', views.restaurant_select, name='restaurant-select'),
]
