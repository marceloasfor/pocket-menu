from django.urls import path, include
import django_eventstream

from order import views

urlpatterns = [
    path('order/active/', views.ActiveOrderView.as_view(), name='order-for-user'),
    path('order/', views.OrderView.as_view(), name='order'),
    path('order/user/<int:user_id>/', views.OrderForUser.as_view(), name='user-order'),

    path('orders/stream/', include(django_eventstream.urls), {
        'channels': ['orders']
    }),
]
