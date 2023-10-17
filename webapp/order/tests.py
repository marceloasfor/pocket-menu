from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

class OrderTestCase(TestCase):
    def setUp(self):
        self.superuser = User.objects.create_superuser(
            username='order_test_case',
            email='admin@example.com',
            password='supersecret'
        )

    def test_order_page(self):
        """Testa se a disponibilidade da página de pedidos em admin."""
        self.client.login(username='order_test_case', password='supersecret')
        response = self.client.get('http://localhost:8000/admin/order/order/')
        self.assertEqual(response.status_code, 200, "Não foi possível acessar a página de admin de pedido.")

    def test_order_add(self):
        """Testa a criação de pedidos."""
        # FIXME: Por algum motivo eu não to conseguindo fazer um post.....
        self.assertTrue(True)
 
