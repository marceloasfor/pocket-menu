from django.urls import path

from order import views

urlpatterns = [
    path('order/active/', views.ActiveOrderView.as_view(), name='order-for-user'),
    path('order/', views.OrderView.as_view(), name='order'),
]
