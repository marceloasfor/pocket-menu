from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import serializers

from table.models import Table
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def active_table_number(self, foo):
    #     user = self.request.user.id
    #     table = Table.objects.filter(users__in=[user])
    #     if table:
    #         return table.number
    #     return 0
