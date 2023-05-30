from rest_framework import serializers

from .models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        # fields = ['name', 'description', 'email', 'groups']
        fields = '__all__'