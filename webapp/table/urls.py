from django.urls import path

from . import views

urlpatterns = [
    path('table/', views.AllTables.as_view(), name='all-tables'),
    path('table/<int:id>/', views.TableDetail.as_view(), name='table-detail'),
    path('table/<int:id>/verification/', views.TableVerification.as_view(), name='table-detail'),
    path('table/member/', views.UsersInTableList.as_view(), name='table-members'),
]
