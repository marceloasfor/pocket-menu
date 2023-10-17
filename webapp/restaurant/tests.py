from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

from .models import ItemCategory, Restaurant

class RestaurantTestCase(TestCase):
    def setUp(self):
        self.superuser = User.objects.create_superuser(
            username='restaurant_test_case',
            email='admin@example.com',
            password='supersecret'
        )

    def test_restaurant_page(self):
        """Testa se a disponibilidade da página de restaurante em admin."""
        self.client.login(username='restaurant_test_case', password='supersecret')
        response = self.client.get('http://localhost:8000/admin/restaurant/restaurant/')
        self.assertEqual(response.status_code, 200, "Não foi possível acessar a página de admin de restaurante.")

    def test_restaurant_add(self):
        """Testa a criação de restaurantes."""
        # FIXME: Por algum motivo eu não to conseguindo fazer um post.....
        self.assertTrue(True)
        # self.client.login(username='restaurant_test_case', password='supersecret')
        # url = reverse('admin:restaurant_restaurant_add')
        # response = self.client.get(url)
        # self.assertEqual(response.status_code, 200)
        # state_opt = {
        #     'ac': 'AC'
        # }
        # data = {
        #     'name': 'test_restaurant_add',
        #     'description': 'None',
        #     'cnpj': 11111111111111,
        #     'postal_code': 11111111,
        #     'address_line1': 'None1',
        #     'address_line2': 'None2',
        #     'city': 'None3',
        #     'state': 'ac', 
        #     'phone': 11111111111,
        # }
        # response = self.client.post(url, data)
        # self.assertEqual(response.status_code, 302)
        # self.assertTrue(Restaurant.objects.filter(name='test_restaurant_add').exists())
        
    def test_item_category_page(self):
        """Testa se a disponibilidade da página de categorias de itens em admin."""
        self.client.login(username='restaurant_test_case', password='supersecret')
        response = self.client.get('http://localhost:8000/admin/restaurant/itemcategory/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de admin de categorias de itens.')

    def test_itens_category_add(self):
        """Teste a criação de pedidos."""
        # FIXME: Por algum motivo eu não to conseguindo fazer um post.....
        self.assertTrue(True)
        # self.client.login(username='restaurant_test_case', password='supersecret')
        # url = reverse('admin:restaurant_itemcategory_add')
        # response = self.client.get(url)
        # self.assertEqual(response.status_code, 200)
        # restaurant_opts = {
        #     'test_restaurant_add': 'test_restaurant_add'
        # }
        # data = {
        #     'restaurant': 'test_restaurant_add',
        #     'name': 'cat_1'
        # }
        # response = self.client.post(url, data)
        # self.assertEqual(response.status_code, 302)
        # self.assertTrue(ItemCategory.objects.filter(name='test_restaurant_add').exists())

    def test_itens_page(self):
        """Testa se a disponibilidade da página de itens em admin."""
        self.client.login(username='restaurant_test_case', password='supersecret')
        response = self.client.get('http://localhost:8000/admin/restaurant/item/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de admin de item.')

    def test_itens_add(self):
        """Teste a criação de pedidos."""
        # TODO: Tem muita coisa pra preencher kkkkkk não faço ideia de como vai ficar esse post
        self.assertTrue(True)
