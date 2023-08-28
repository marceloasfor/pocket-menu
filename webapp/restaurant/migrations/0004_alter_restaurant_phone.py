# Generated by Django 4.2.1 on 2023-06-14 22:31

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_alter_item_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='phone',
            field=models.CharField(max_length=11, validators=[django.core.validators.MinLengthValidator(10, message='O telefone deve ter no mínimo 10 dígitos, incluindo o DDD.'), django.core.validators.MaxLengthValidator(11, message='O telefone deve ter no máximo 11 dígitos, incluindo o DDD.')], verbose_name='Telefone'),
        ),
    ]
