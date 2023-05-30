from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'restaurant', views.RestaurantViewSet)

api = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

urlpatterns = [
    path('available_restaurants', views.index, name='available_restaurants'),
    path('tables/<int:restaurant_id>/', views.show_tables, name='show_tables'),
    path('api/', include((api, 'api'), namespace='api')),
]
