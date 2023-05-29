from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator, MaxLengthValidator

from .const import AVAILABLE_STATES

class Restaurant(models.Model):
    name = models.CharField(
        max_length=100,
        blank=False,
        verbose_name="Nome do Restaurante"
    )
    description = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Descrição"
    )
    cnpj = models.CharField(
        max_length=14,
        validators=[
            RegexValidator("^[0-9]{14}$", "CNPJ inválido!")
        ],
        verbose_name="CNPJ"
    )
    postal_code = models.CharField(
        max_length=8,
        validators=[
            RegexValidator("^[0-9]{8}$", "CEP inválido!")
        ],
        verbose_name="CEP"
    )
    address_line1 = models.CharField(
        max_length=100,
        blank=False,
        verbose_name="Endereço 1"
    )
    address_line2 = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Endereço 2 (Opcional)"
    )
    city = models.CharField(
        max_length=100,
        blank=False,
        verbose_name="Cidade"
    )
    state = models.CharField(
        max_length=2,
        choices=AVAILABLE_STATES,
        verbose_name="Estado"
    )
    phone = models.CharField(
        max_length=11,
        blank=False,
        verbose_name="Telefone",
        validators=[
            MinLengthValidator(11, message='O telefone deve ter no mínimo 11 dígitos, incluindo o DDD.'),
            MaxLengthValidator(11, message='O telefone deve ter no máximo 11 dígitos, incluindo o DDD.')
        ]
    )

    class Meta:
        ordering = ['id']
        verbose_name = "Restaurante"
        verbose_name_plural = "Restaurantes"

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

    def get_available_tables_count(self) -> int:
        """Mostra a quantidade de mesas disponíveis.

        'table_set' é a relação inversa para a FK de 'restaurant',
        a partir disso, filtra as 'tables' com 'available = True'
        e realiza a contagem com o 'count'.

        Returns
        -------
        int
            A qntd. de mesas disponíveis.
        """
        return self.table_set.filter(available=True).count()
