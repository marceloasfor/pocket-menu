import decimal

from django.contrib.auth.models import User
from django.db import models

from restaurant.models import Item
from table.models import Table


class OrderItem(models.Model):
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        default=0.0
    )
    quantity = models.IntegerField(default=1)
    item_name = models.CharField(
        max_length=100,
        blank=False,
        verbose_name="Nome do Prato/Produto"
    )
    item_id = models.IntegerField(default=0, null=True)

class Order(models.Model):
    class STATUS:
        CREATED = 0
        PAID = 100
        CANCELLED = -100

    STATUS_CHOICES = (
        (STATUS.CREATED, 'CREATED'),
        (STATUS.PAID, 'PAID'),
        (STATUS.CANCELLED, 'CANCELLED'),
    )

    user_id = models.ForeignKey(User, blank=True, editable=False, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, blank=True, editable=False, on_delete=models.CASCADE)
    status = models.IntegerField(
        'OrderStatus',
        default=0,
        blank=True,
        choices=STATUS_CHOICES,
    )
    order_items = models.ManyToManyField(OrderItem, blank=True, editable=False)

    @classmethod
    def active_orders_for_restaurant(cls, restaurant_id):
        table_qs = Table.objects.filter(restaurant__in=[restaurant_id])
        orders_qs = cls.objects.filter(
            status=Order.STATUS.CREATED,
            table__in=table_qs,
        )
        return orders_qs

    @classmethod
    def active_orders_for_user(cls, user):
        order = cls.objects.filter(user_id=user, status=Order.STATUS.CREATED)
        if order.exists():
            return order[0]
        return None

    @classmethod
    def create_order(cls, user, item, table):
        order_item = OrderItem(
            price=item.price,
            item_name=item.name,
            quantity=1,
            item_id=item.id,
        )
        order_item.save()

        order = cls.objects.create(
            user_id=user,
            table=table,
            status=cls.STATUS.CREATED,
        )
        order.save()
        order.order_items.add(order_item)
        order.save()
        return order.id

    def add_item(self, item):
        order_item = OrderItem(
            price=item.price,
            item_name=item.name,
            quantity=1,
            item_id=item.id,
        )
        order_item.save()
        self.order_items.add(order_item)
        self.save()

    @property
    def total(self):
        price = decimal.Decimal(0.0)
        for item in self.order_items.all():
            price += item.price
        return price
