import random

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

MIN_RAND = 1
MAX_RAND = 99999

class Table(models.Model):
    restaurant = models.ForeignKey('restaurant.Restaurant', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, blank=True, editable=False)
    capacity = models.PositiveIntegerField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10),
        ],
        verbose_name='Capacidade',
    )
    available = models.BooleanField(
        default=True,
        verbose_name='Mesa Disponível?',
    )
    number = models.PositiveIntegerField(
        default=0,
        verbose_name='Número da Mesa',
        unique=True,
    )
    verification_code = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name='Número da Mesa',
        unique=True,
    )

    class Meta:
        ordering = ['number']
        verbose_name = 'Mesa'
        verbose_name_plural = 'Mesas'

    def __unicode__(self):
        return f'{self.number}'

    def generate_table_key(self):
        if not self.verification_code:
            while(True):
                key = random.randint(MIN_RAND, MAX_RAND)
                if not Table.objects.filter(verification_code=key).exists():
                    self.verification_code = random.randint(MIN_RAND, MAX_RAND)
                    self.save()

    def clear_table_key(self):
        if self.verification_code:
            self.verification_code = 0
            self.save()
