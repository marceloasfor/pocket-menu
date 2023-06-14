from rest_framework import serializers

from order.models import Order

class OrderSerializer(serializers.ModelSerializer):
  '''Serializer to Get Order Details using Django Token Authentication'''

  class Meta:
    model = Order
    fields = '__all__'