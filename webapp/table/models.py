from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Table(models.Model):
    restaurant = models.ForeignKey('restaurant.Restaurant', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name="tables", blank=True, editable=False)
    capacity = models.PositiveIntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10)
        ],
        verbose_name="Capacidade"
    )
    available = models.BooleanField(
        default=True,
        verbose_name="Mesa Disponível?"
    )

    class Meta:
        ordering = ['id']
        verbose_name = "Mesa"
        verbose_name_plural = "Mesas"
