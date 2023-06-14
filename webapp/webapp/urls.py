"""
URL configuration for webapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from user.views import UserViewSet
from restaurant import views as restaurant_views
from table.views import TableViewSet
from order import views as order_views

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'restaurant', restaurant_views.RestaurantViewSet)
router.register(r'item', restaurant_views.ItemViewSet)
router.register(r'itemcategory', restaurant_views.ItemCategoryViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls, name="admin"),
    path('', include(router.urls)),
    path('', include('table.urls')),
    path('order/', order_views.OrderView.as_view(), name='order'),
]
