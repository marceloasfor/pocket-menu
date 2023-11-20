import json

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from django_eventstream import send_event

from .models import Table
from .serializers import TableSerializer


class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        restaurant = self.request.query_params.get('restaurant', 0)
        try:
            restaurant = int(restaurant)
        except Exception as e:
            raise(e)

        if restaurant:
            self.queryset = self.queryset.filter(restaurant=restaurant)

        number = self.request.query_params.get('number', 0)
        if number:
            self.queryset = self.queryset.filter(number=number)

        return self.queryset

class TableVerification(APIView):
    def get(self, request, id=None, format=None):
        if not id:
            return Response({'error': 'Missing table id'}, status=status.HTTP_400_BAD_REQUEST)
        table = get_object_or_404(Table, id=id)
        return Response({'verification_code': table.verification_code}, status=status.HTTP_200_OK)

class AllTables(APIView):
    def get(self, request, format=None):
        restaurant_id = request.GET.get('restaurant')
        if restaurant_id:
            tables = Table.objects.filter(restaurant__in=[restaurant_id])
        else:
            tables = Table.objects.all()

        data = []
        for table in tables:
            users = []
            for user in table.users.all():
                users.append(
                    {
                        'id': user.id,
                        'username': user.username,
                    },
                )
            data.append(
                {
                    'id': table.id,
                    'restaurant_id': table.restaurant.id,
                    'number': table.number,
                    'verification_code': table.verification_code,
                    'users': users,
                },
            )
        return Response(data)

class TableDetail(APIView):
    def get(self, request, id=None, format=None):
        if not id:
            return Response({'error': 'Missing table id'}, status=status.HTTP_400_BAD_REQUEST)
        table = get_object_or_404(Table, id=id)

        users = []
        for user in table.users.all():
            users.append(
                {
                    'id': user.id,
                    'username': user.username,
                },
            )
        data = {
            'id': table.id,
            'restaurant_id': table.restaurant.id,
            'number': table.number,
            'verification_code': table.verification_code,
            'users': users,
        },
        return Response(data)

class UsersInTableList(APIView):
    def get(self, request, format=None):
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split('Bearer')[-1].strip()
            user = Token.objects.get(key=token).user
        except (IndexError, TypeError, AttributeError):
            return Response({'error': 'Missing authentication token'}, status=status.HTTP_403_FORBIDDEN)
        except Token.DoesNotExist:
            return Response({'error': 'No user found with the provided token'}, status=status.HTTP_404_NOT_FOUND)

        table = Table.objects.filter(users__in=[user])

        data = []
        if table.exists():
            table = table[0]
            users_in_table = table.users.all()

            for user in users_in_table:
                context = {
                    'id': user.id,
                    'username': user.username,
                    # 'first_name': user.first_name,
                    # 'last_name': user.last_name,
                    # 'email': user.email,
                }
                data.append(context)

        return Response(data)

    def post(self, request, format=None):
        body = json.loads(request.body)

        verification_code = body.get('verification_code')
        if not verification_code:
            return Response({'error': 'Verification code not provided'}, status=status.HTTP_403_FORBIDDEN)
        
        username = body.get('username')
        if not username:
            return Response({'error': 'Username not provided'}, status=status.HTTP_400_BAD_REQUEST)

        table = Table.objects.filter(verification_code=verification_code)
        if not table.exists():
            return Response({'error': 'Table not found'}, status=status.HTTP_404_NOT_FOUND)
        # elif not table[0].available:
        #     return Response({'error': 'Table not available'}, status=status.HTTP_409_CONFLICT)
        # elif table[0].capacity <= table[0].users.count():
        #     return Response({'error': 'Table is full'}, status=status.HTTP_409_CONFLICT)

        user = User.objects.get_or_create(username=username)
        token = Token.objects.get_or_create(user=user[0])
        if Table.objects.filter(users__in=[user[0].id]).exists():
            Table.objects.get(users__in=[user[0].id]).id
            resp = Response({'token': token[0].key}, status=status.HTTP_200_OK)
            resp.set_cookie('name', username)
            return resp

        # last_id = get_current_event_id(['table-{}'.format(table[0].number)])
        # print(last_id)

        table[0].users.add(user[0].id)
        resp = Response({'token': token[0].key, 'restaurant': table[0].restaurant.id}, status=status.HTTP_201_CREATED)
        resp.set_cookie('name', username)

        # Dispara o evento
        # users = [{"username": user.username} for user in table[0].users.all()]
        send_event('table-{}'.format(table[0].number), 'join-table', {'id': user[0].id, 'username': user[0].username})

        return resp

    def delete(self, request, format=None):
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split('Bearer')[-1].strip()
            user = Token.objects.get(key=token).user
        except (IndexError, TypeError, AttributeError):
            return Response({'error': 'Missing authentication token'}, status=status.HTTP_403_FORBIDDEN)
        except Token.DoesNotExist:
            return Response({'error': 'No user found with the provided token'}, status=status.HTTP_404_NOT_FOUND)

        table = Table.objects.filter(users__in=[user.id])
        if table:
            table[0].users.remove(user)
            # users = [{"username": user.username} for user in table[0].users.all()]
            send_event('table-{}'.format(table[0].number), 'leave-table', {'id': user.id, 'username': user.username})
            return Response({'Success': f'{user.username} removed from table'}, status=status.HTTP_200_OK)
        return Response({'Error': f'{user.username} Not in any table'}, status=status.HTTP_404_NOT_FOUND)
