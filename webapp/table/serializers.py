from rest_framework import serializers

from .models import Table


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'number', 'verification_code', 'capacity', 'available', 'restaurant', 'users']
        # fields = '__all__'