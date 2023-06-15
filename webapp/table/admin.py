from django.contrib import admin

from .models import Table


class TableInline(admin.TabularInline):
    model = Table
    extra = 0
    can_delete = True



class UserInline(admin.TabularInline):
    model = Table.users.through
    extra = 0
    can_delete = True


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'restaurant', 'verification_code')
    search_fields = ('number',)
    list_filter = ('restaurant',)
    inlines = [UserInline]
