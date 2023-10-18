import json

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import permissions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from django_eventstream import send_event, get_current_event_id

from order.models import Order
from restaurant.models import Item
from table.models import Table



class ActiveOrderView(APIView):
    def get(self, request, format=None):
        '''reply active orders for user'''
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split('Bearer')[-1].strip()
            user = Token.objects.get(key=token).user
        except (IndexError, TypeError, AttributeError):
            return Response({'error': 'Missing authentication token'}, status=status.HTTP_403_FORBIDDEN)
        except Token.DoesNotExist:
            return Response({'error': 'No user found with the provided token'}, status=status.HTTP_404_NOT_FOUND)

        order = Order.active_orders_for_user(user=user)
        if not order:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        items = []
        for item in order.order_items.all():
            items.append(
                {
                    'itemId': item.item_id,
                    'name': item.item_name,
                    'price': item.price,
                },
            )
        order_obj = {
            'order_id': order.id,
            'user_id': order.user_id.id,
            'table_id': order.table.id,
            'table_number': order.table.number,
            'items': items,
        }
        return Response(order_obj, status=status.HTTP_200_OK)


class OrderView(APIView):
    def get(self, request, format=None):
        order_objs = Order.objects.all()

        orders_list = []
        for order in order_objs:
            items = []
            for item in order.order_items.all():
                items.append(
                    {
                        'itemId': item.item_id,
                        'name': item.item_name,
                        'price': item.price,
                    },
                )
            orders_list.append(
                {
                    'order_id': order.id,
                    'user_id': order.user_id.id,
                    'table_id': order.table.id,
                    'table_number': order.table.number,
                    'items': items,
                },
            )
        return Response(orders_list, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        '''reply active orders for user'''
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split('Bearer')[-1].strip()
            user = Token.objects.get(key=token).user
        except (IndexError, TypeError, AttributeError):
            return Response({'error': 'Missing authentication token'}, status=status.HTTP_403_FORBIDDEN)
        except Token.DoesNotExist:
            return Response({'error': 'No user found with the provided token'}, status=status.HTTP_404_NOT_FOUND)

        table = Table.objects.filter(users__in=[user])

        body = json.loads(request.body)
        item_id = body.get('id')
        if not item_id:
            return Response({'error': f'Item id {item_id} not found'}, status=status.HTTP_404_NOT_FOUND)
        item = Item.objects.filter(id=item_id)
        if not item:
            return Response({'error': f'Item {item_id} not found'}, status=status.HTTP_404_NOT_FOUND)

        order = Order.active_orders_for_user(user=user)
        if not order:
            order = Order.create_order(user=user, item=item[0], table=table[0])
        else:
            order.add_item(item=item[0])
            order.save()

        orders = [f'{item.item_name} - {order.table.number}' for item in order.order_items.all()]
        print(orders)
        send_event('orders', 'new-order', orders)
        
        return Response({'Success': 'Item added to the order'}, status=status.HTTP_201_CREATED)
