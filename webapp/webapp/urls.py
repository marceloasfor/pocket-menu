from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from user.views import UserViewSet
from restaurant import views as restaurant_views

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'restaurant', restaurant_views.RestaurantViewSet)
router.register(r'item', restaurant_views.ItemViewSet)
router.register(r'itemcategory', restaurant_views.ItemCategoryViewSet)

urlpatterns = [
    path('', include('restaurant.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls, name="admin"),
    path('', include(router.urls)),
    path('', include('table.urls')),
    path('', include('order.urls')),
]
