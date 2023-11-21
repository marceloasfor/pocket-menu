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


class OrderForUser(APIView):
    def get(self, request, user_id=None, format=None):
        '''reply active orders for user'''
        if not user_id:
            return Response({'error': 'user_id missing'}, status=status.HTTP_404_NOT_FOUND)

        order = Order.active_orders_for_user(user=user_id)
        if not order:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        items = []
        for item in order.order_items.all():
            items.append(
                {
                    'itemId': item.item_id,
                    'name': item.item_name,
                    'price': item.price,
                    'quantity': item.quantity,
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
                    'quantity': item.quantity,
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
                        'quantity': item.quantity,
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
        item_list = body.get('items')

        if item_id:
            item = Item.objects.filter(id=item_id)
            print(type(item[0]))
            if not item:
                return Response({'error': f'Item {item_id} not found'}, status=status.HTTP_404_NOT_FOUND)
            item[0].quantity = 1
            items = [item[0]]
        elif item_list:
            items = []
            for it in item_list:
                item = Item.objects.filter(id=it["id"])[0]
                if not item:
                    return Response({'error': f'An order item with id {it["id"]} was not found'}, status=status.HTTP_404_NOT_FOUND)
                item.quantity = it["quantity"]
                items.append(item)
        else:
            return Response({'error': f'Missing item_id or items field'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.active_orders_for_user(user=user)
        for order_item in items:
            if not order:
                order = Order.create_order(user=user, item=order_item, table=table[0])
            else:
                order.add_item(item=order_item)
                order.save()

        user_order = [f'{item.item_name} - {order.table.number}' for item in order.order_items.all()]
        # print(orders)
        send_event('orders', 'new-order', user_order)

        return Response({'Success': 'Item added to the order'}, status=status.HTTP_201_CREATED)
