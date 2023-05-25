from django.db import models
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator

from .const import AVAILABLE_STATES

class Restaurant(models.Model):
    name = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=255, blank=True)
    cnpj = models.CharField(max_length=14, validators=[
        RegexValidator("^[0-9]{14}$", "CNPJ inválido!")
    ])
    postal_code = models.CharField(max_length=8, validators=[
        RegexValidator("^[0-9]{8}$", "CEP inválido!")
    ])
    address_line1 = models.CharField(max_length=100, blank=False)
    address_line2 = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=False)
    state = models.CharField(max_length=2, choices=AVAILABLE_STATES)
    phone = models.CharField(max_length=20, blank=False)
    table_count = models.PositiveIntegerField(default=0, validators=[
        MinValueValidator(0), MaxValueValidator(50)
    ])

    class Meta:
        ordering = ['id']
        verbose_name_plural = "restaurants"
    
    @property
    def formatted_phone(self) -> str:
        """Retorna o número do telefone reorganizado.

        Reorganiza o número do telefone.

        Returns
        -------
        str
            O número do telefone reorganizado.
        """
        return f'({self.phone[0:2]}) {self.phone[2:7]}-{self.phone[7:]}'

    @property
    def formatted_cnpj(self) -> str:
        """Retorna o CNPJ reorganizado.

        Reorganiza o CNPJ.

        Returns
        -------
        str
            O CNPJ reorganizado.
        """
        return f'{self.cnpj[0:2]}.{self.cnpj[2:5]}.{self.cnpj[5:8]}/{self.cnpj[8:12]}-{self.cnpj[12:]}'