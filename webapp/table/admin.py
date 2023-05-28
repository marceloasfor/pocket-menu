from django.contrib import admin

from .models import Table

class TableInline(admin.TabularInline):
    model = Table
    extra = 0
    can_delete = False
