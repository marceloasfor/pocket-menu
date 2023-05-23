from django.core.validators import RegexValidator
from django.db import models
from django.utils.text import gettext_lazy as _
from model_utils.models import TimeStampedModel

from .const import STATE_CHOICES


class Store(TimeStampedModel):
    id = models.AutoField(primary_key=True)
    name = models.CharField(
        max_length=100,
        blank=False,
    )
    description = models.CharField(
        max_length=250,
        blank=True,
    )
    cnpj = models.CharField(
        max_length=14,
        validators=[RegexValidator('^[0-9]{14}$', _('CNPJ inválido'))],
    )
    postal_code = models.CharField(
        max_length=8,
        validators=[RegexValidator('^[0-9]{8}$', _('CEP inválido'))],
    )
    address_line1 = models.CharField(
        max_length=100,
        blank=False,
    )
    address_line2 = models.CharField(
        max_length=100,
        blank=True,
    )
    city = models.CharField(
        max_length=100,
        blank=True,
    )
    state = models.CharField(
        max_length=2,
        choices=STATE_CHOICES,
    )
    phone_number = models.CharField(
        max_length=20,
        blank=True,
    )

    class Meta:
        ordering = ['id']
        verbose_name_plural = "stores"

    @property
    def formatted_phone(self):
        p = self.phone_number
        return f'({p[0:2]}) {p[2:7]}-{p[7:]}'

    @property
    def formatted_cnpj(self):
        c = self.cnpj
        return f'{c[0:2]}.{c[2:5]}.{c[5:8]}/{c[8:12]}-{c[12:]}'
