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
        elif not table[0].available:
            return Response({'error': 'Table not available'}, status=status.HTTP_409_CONFLICT)
        elif table[0].capacity <= table[0].users.count():
            return Response({'error': 'Table is full'}, status=status.HTTP_409_CONFLICT)

        user, user_created = User.objects.get_or_create(username=username)
        token = Token.objects.get_or_create(user=user)

        response_status = status.HTTP_200_OK

        if user_created:
            response_status = status.HTTP_201_CREATED
            table[0].users.add(user.id)
        elif not table[0].users.contains(user):
            return Response({'error': 'Username already taken'}, status=status.HTTP_409_CONFLICT)

        resp = Response(
            {
                'user_id': user.id,
                'username': user.username,
                'token': token[0].key,
                'restaurant_id': table[0].restaurant.id,
                'restaurant_name': table[0].restaurant.name,
                'table_number': table[0].number,
                'table_login_code': table[0].verification_code,
            },
            status=response_status
        )
        resp.set_cookie('name', username)

        send_event(
            'table-{}'.format(table[0].number),
            'join-table', {'id': user.id, 'username': user.username}
        )

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
            send_event('table-{}'.format(table[0].number), 'leave-table', {'id': user.id, 'username': user.username})
            return Response({'Success': f'{user.username} left the table'}, status=status.HTTP_200_OK)
        return Response({'Error': f'{user.username} Not in any table'}, status=status.HTTP_404_NOT_FOUND)
