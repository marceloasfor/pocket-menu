from django.test import Client
from django.test import TestCase
from django.contrib.auth.models import User

from .models import Table
from restaurant.models import Restaurant

class TableTestCase(TestCase):
    """Realiza testes em cima do modelo de Mesas no painel do admin."""

    def setUp(self):
        # Configura um superusuário para realizar os testes.
        self.superuser_username = 'test_case'
        self.superuser_email = 'test@case.com'
        self.superuser_password = 'test_case'
        self.superuser = User.objects.create_superuser(
            username=self.superuser_username,
            email=self.superuser_email,
            password=self.superuser_password,
        )


    def test_login_superuser(self):
        """Testa autenticação como superusuário."""
        c = Client()
        logged_in = c.login(username=self.superuser_username, password=self.superuser_password)
        self.assertTrue(logged_in, 'Não foi possível entrar como super usuário.')
        c.logout()
 

    def test_admin_restaurant_page_up(self):
        """Testa se a página de restaurante no painel do admin é acessível."""
        c = Client()
        logged_in = c.login(username=self.superuser_username, password=self.superuser_password)
        self.assertTrue(logged_in, 'Não foi possível entrar como super usuário.')

        response = c.get('/admin/restaurant/restaurant/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de restaurante no painel de admin.')
        c.logout()


    def test_admin_add_new_restaurant(self):
        """Testa se um superusuário consegue adicionar um novo restaurante."""
        c = Client()
        logged_in = c.login(username=self.superuser_username, password=self.superuser_password)
        self.assertTrue(logged_in, 'Não foi possível entrar como super usuário.')

        response = c.get('/admin/restaurant/restaurant/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de restaurante no painel de admin.')

        data = {'name': 'test_restaurant_add', 'description': 'None', 'cnpj': 11111111111111, 'postal_code': 11111111,
                'address_line1': 'None', 'city': 'None', 'state': 'ac', 'phone': 11111111111, 'table_set-0-capacity': '1',
                'table_set-0-available': True, 'table_set-0-number': '1', 'table_set-0-verification_code': '1234',}
        # Essas duas linhas são obrigatórias pq os campos de 'table' são ocultos qnd vai adicionar um restaurante.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = c.post('/admin/restaurant/restaurant/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um restaurante no painel do admin (algum campo está errado).')
        self.assertTrue(Restaurant.objects.filter(name='test_restaurant_add').exists(), 'O restaurante foi criado mas não foi adicionado ao banco de dados.')
        c.logout()


    def test_admin_table_page_up(self):
        """Testa se a página de mesas no painel do admin é acessível."""
        c = Client()
        logged_in = c.login(username=self.superuser_username, password=self.superuser_password)
        self.assertTrue(logged_in, 'Não foi possível entrar como super usuário.')

        response = c.get('/admin/table/table/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de mesas no painel de admin.')
        c.logout()


    def test_admin_add_new_table(self):
        """Testa se um superusuário consegue adicionar uma nova mesa."""
        c = Client()
        logged_in = c.login(username=self.superuser_username, password=self.superuser_password)
        self.assertTrue(logged_in, 'Não foi possível entrar como super usuário.')

        response = c.get('/admin/restaurant/restaurant/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de restaurante no painel de admin.')

        data = {'name': 'test_restaurant_add', 'description': 'None', 'cnpj': 11111111111111, 'postal_code': 11111111,
                'address_line1': 'None', 'city': 'None', 'state': 'ac', 'phone': 11111111111, 'table_set-0-capacity': '1',
                'table_set-0-available': True, 'table_set-0-number': '1', 'table_set-0-verification_code': '1234',}
        # Essas duas linhas são obrigatórias pq os campos de 'table' são ocultos qnd vai adicionar um restaurante.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = c.post('/admin/restaurant/restaurant/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um restaurante no painel do admin (algum campo está errado).')
        self.assertTrue(Restaurant.objects.filter(name='test_restaurant_add').exists(), 'O restaurante foi criado mas não foi adicionado ao banco de dados.')
        
        response = c.get('/admin/table/table/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de mesas no painel de admin.')
        
        data = {'restaurant': 1, 'capacity': 1, 'available': True, 'number': 2, 'verification_code': '4321'}
        # Parece que tem campo oculto quando vai adicionar 'table' tbm...
        data['Table_users-TOTAL_FORMS'] = 1
        data['Table_users-INITIAL_FORMS'] = 0
        response = c.post('/admin/table/table/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma mesa no painel do admin (algum campo está errado).')
        self.assertTrue(Table.objects.filter(number=2).exists(), 'A mesa foi criada mas não foi adicionada ao banco de dados.')
        c.logout()