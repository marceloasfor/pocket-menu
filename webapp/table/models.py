from django.db import models
from django.contrib.auth.models import User

class Table(models.Model):
    capacity = models.PositiveIntegerField()
    users = models.ManyToManyField(User, related_name="tables", blank=True)
    available = models.BooleanField(default=True)