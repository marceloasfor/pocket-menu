"""
ASGI config for webapp project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
import django_eventstream
from django.core.asgi import get_asgi_application
from django.urls import path, re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'webapp.settings')

application = ProtocolTypeRouter({
    'http': URLRouter([
        path('table/<table_number>/stream/', AuthMiddlewareStack(
            URLRouter(django_eventstream.routing.urlpatterns)
        ), { 'format-channels': ['table-{table_number}'] }),
        path('orders/stream/', AuthMiddlewareStack(
            URLRouter(django_eventstream.routing.urlpatterns)
        ), {'channels': ['orders']}),
        path('stream/', AuthMiddlewareStack(
            URLRouter(django_eventstream.routing.urlpatterns)
        )),
        re_path(r'', get_asgi_application()),
    ]),
})
