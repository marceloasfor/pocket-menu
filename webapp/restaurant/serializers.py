from rest_framework import serializers

from table.models import Table
from table.serializers import TableSerializer
from user.serializers import UserSerializer
from .models import Restaurant, Item, ItemCategory


class RestaurantSerializer(serializers.ModelSerializer):
    tables = TableSerializer(source='table_set', many=True)

    class Meta:
        model = Restaurant
        # fields = ['id', 'name', 'description', 'cnpj', 'tables']
        fields = '__all__'


class ItemCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ItemCategory
        fields = ['id', 'name', 'sort_order']


class ItemSerializer(serializers.HyperlinkedModelSerializer):
    category = ItemCategorySerializer()
    restaurant = RestaurantSerializer()
    class Meta:
        model = Item
        # fields = '__all__'
        fields = ['id', 'name', 'description', 'price', 'restaurant', 'category']
