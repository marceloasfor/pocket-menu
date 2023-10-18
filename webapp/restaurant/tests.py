from django.test import Client
from django.test import TestCase
from django.contrib.auth.models import User

from .models import ItemCategory, Restaurant

# TODO: Vou ter que refazer isso aqui, as informações não são compartilhadas entre os testes, basicamente vou ter q repetir uma ruma de coisa em cada teste.....

class RestaurantTestCase(TestCase):
    def setUp(self):
        self.superuser = User.objects.create_superuser(
            username='test_case',
            email='test@case.com',
            password='test_case'
        )

    def test_user_auth(self):
        """
        Testa a autenticação de um cliente como superusuário.
        """
        self.c = Client()
        logged_in = self.c.login(username='test_case', password='test_case')
        self.assertTrue(logged_in, "Não foi possível entrar como super usuário.")

    def test_restaurant_page(self):
        """
        Testa se o cliente consegue acessar a página de restaurante no painel do admin.
        """
        self.test_user_auth()
        # Tenta acessar a página de restaurante do admin (302 se não for possível)
        response = self.c.get('/admin/restaurant/restaurant/')
        self.assertEqual(response.status_code, 200, "Não foi possível acessar a página de admin de restaurante.")
        self.c.logout()

    def test_restaurant_add(self):
        """
        Testa se o cliente consegue criar um restaurante no painel do admin.
        """
        self.test_user_auth()
        data = {
            'name': 'test_restaurant_add',
            'description': 'None',
            'cnpj': 11111111111111,
            'postal_code': 11111111,
            'address_line1': 'None',
            'city': 'None',
            'state': 'ac', 
            'phone': 11111111111,
            'table_set-0-capacity': '1',
            'table_set-0-available': True,
            'table_set-0-number': '1',
            'table_set-0-verification_code': '1234',
        }
        # Essas duas linhas tavam quebrando tudo pq 'Mesa' também era um form OBRIGATÓRIO mas tava como oculto por algum motivo.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = self.c.post('/admin/restaurant/restaurant/add/', data)
        self.assertEqual(response.status_code, 302, "Não foi possível criar um restaurante no painel do admin.")
        self.assertTrue(Restaurant.objects.filter(name='test_restaurant_add').exists(), "Não foi possível criar um restaurante no painel do admin.")
        self.c.logout()
        
    def test_item_category_page(self):
        """
        Testa se o cliente consegue acessar a página de categorias de itens no painel do admin.
        """
        self.test_user_auth()
        # Tenta acessar a página de categorias de itens do admin (302 se não for possível)
        response = self.c.get('/admin/restaurant/itemcategory/')
        self.assertEqual(response.status_code, 200, "Não foi possível acessar a página de admin de categorias de itens.")
        self.c.logout()

    def test_item_category_add(self):
        """
        Testa se o cliente consegue criar uma categoria de item no painel do admin.
        """
        self.test_user_auth()

        # TODO: Tem que criar um restaurante aqui pra q 'ItemCategory' consiga ter acesso a um na hora de criar.

        data = {
            'name': 'test_restaurant_add',
            'description': 'None',
            'cnpj': 11111111111111,
            'postal_code': 11111111,
            'address_line1': 'None',
            'city': 'None',
            'state': 'ac', 
            'phone': 11111111111,
            'table_set-0-capacity': '1',
            'table_set-0-available': True,
            'table_set-0-number': '1',
            'table_set-0-verification_code': '1234',
        }
        # Essas duas linhas tavam quebrando tudo pq 'Mesa' também era um form OBRIGATÓRIO mas tava como oculto por algum motivo.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = self.c.post('/admin/restaurant/restaurant/add/', data)

        data = {
            'restaurant': 'test_restaurant_add', # Tem que ser o memso do método test_restaurant_add
            'name': 'test_item_category_add',
            'sort_order': 0,
        }
        response = self.c.post('/admin/restaurant/itemcategory/add/', data)
        print(response.content.decode('utf-8'))
        print(response.status_code)
        print(Restaurant.objects.all())
        print(ItemCategory.objects.all())
        self.assertEqual(response.status_code, 302, "Não foi possível criar uma categoria de item no painel do admin.")
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), "Não foi possível criar uma categoria de item no painel do admin.")
        self.c.logout()

    # def test_itens_page(self):
    #     """Testa se a disponibilidade da página de itens em admin."""
    #     self.client.login(username='restaurant_test_case', password='supersecret')
    #     response = self.client.get('http://localhost:8000/admin/restaurant/item/')
    #     self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de admin de item.')

    # def test_itens_add(self):
    #     """Teste a criação de pedidos."""
    #     self.assertTrue(True)
