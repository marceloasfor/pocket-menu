from drf_yasg import openapi
from drf_yasg.generators import OpenAPISchemaGenerator
from rest_framework.schemas.generators import EndpointEmulator

from restaurant.urls import api

api_info = openapi.Info(
    title='Pocket Menu API',
    default_version='1.0',
    description='API Pública Pocket Menu',
    contact=openapi.Contact(email='fake@fake.com'),
)

class PockeetMenuPublicAPIEndpointEnumerators(EndpointEmulator):
    def __init__(self, patterns=None, urlconf=None, request=None):
        super().__init__(None, urlconf='webapp.urls')


class PockeetMenuPublicAPIEndpointGenerator(OpenAPISchemaGenerator):
    def __init__(self, info, version='', url=None, patterns=None, urlconf=None):
        url = 'localhost:<PORT>/'
        patterns = [path for path in api if hasattr(path, 'name')]
        super().__init__(info, version, url, patterns, urlconf)
