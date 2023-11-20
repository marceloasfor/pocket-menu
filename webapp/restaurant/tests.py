from django.test import Client
from django.test import TestCase
from django.contrib.auth.models import User

from .models import Item, ItemCategory, Restaurant


class RestaurantTestCase(TestCase):
    """Realiza testes em cima do modelo de Restaurante no painel do admin."""

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


    def test_admin_add_existing_restaurant(self):
        """Testa se um superusuário não consegue adicionar um restaurante que já existe."""
        c = Client()
        logged_in = c.login(username=self.superuser_username, password=self.superuser_password)
        self.assertTrue(logged_in, 'Não foi possível entrar como super usuário.')

        response = c.get('/admin/restaurant/restaurant/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de restaurante no painel de admin.')

        data = {'name': 'test_restaurant_add_existing', 'description': 'None', 'cnpj': 11111111111111, 'postal_code': 11111111,
                'address_line1': 'None', 'city': 'None', 'state': 'ac', 'phone': 11111111111, 'table_set-0-capacity': '1',
                'table_set-0-available': True, 'table_set-0-number': '1', 'table_set-0-verification_code': '1234',}
        # Essas duas linhas são obrigatórias pq os campos de 'table' são ocultos qnd vai adicionar um restaurante.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = c.post('/admin/restaurant/restaurant/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um restaurante no painel do admin (algum campo está errado).')
        self.assertTrue(Restaurant.objects.filter(name='test_restaurant_add_existing').exists(), 'O restaurante foi criado mas não foi adicionado ao banco de dados.')
        
        response = c.post('/admin/restaurant/restaurant/add/', data)
        self.assertEqual(response.status_code, 200, 'Foi possível criar um restaurante que já existe')
        self.assertLess(Restaurant.objects.filter(name='test_restaurant_add_existing').count(), 2, 'Um novo restaurante foi adicionado mas ele é idêntico a outro restaurante que já existe no banco de dados.')
        c.logout()
        

    def test_admin_modify_restaurant(self):
        """Testa se um superusuário consegue modificar um restaurante."""
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
        
        data = {'name': 'test_restaurant_modify', 'description': 'None', 'cnpj': 11111111111111, 'postal_code': 11111111,
                'address_line1': 'None', 'city': 'None', 'state': 'ac', 'phone': 11111111111, 'table_set-0-capacity': '1',
                'table_set-0-available': True, 'table_set-0-number': '2', 'table_set-0-verification_code': '4321',}
        # Essas duas linhas são obrigatórias pq os campos de 'table' são ocultos qnd vai adicionar um restaurante.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = c.post('/admin/restaurant/restaurant/1/change/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível modificar um restaurante no painel do admin (algum campo está errado).')
        self.assertTrue(Restaurant.objects.filter(name='test_restaurant_modify').exists(), 'O restaurante foi modificado mas não foi alterado no banco de dados.')
        c.logout()


    def test_admin_item_category_page_up(self):
        """Testa se a página de categoria de item no painel do admin é acessível."""
        c = Client()
        logged_in = c.login(username=self.superuser_username, password=self.superuser_password)
        self.assertTrue(logged_in, 'Não foi possível entrar como super usuário.')

        response = c.get('/admin/restaurant/itemcategory/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de categoria de item no painel de admin.')
        c.logout()


    def test_admin_add_new_item_category(self):
        """Testa se um superusuário consegue adicionar uma nova categoria de item."""
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
        
        data = {'restaurant': '1', 'name': 'test_item_category_add', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')
        c.logout()


    def test_admin_modify_item_category(self):
        """Testa se um superusuário consegue modificar uma categoria de item."""
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
        
        data = {'restaurant': '1', 'name': 'test_item_category_add', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')
        
        data = {'restaurant': '1', 'name': 'test_item_category_modify', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/1/change/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível modificar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_modify').exists(), 'A categoria de item foi modificada mas não foi alterada no banco de dados.')
        c.logout()


    def test_admin_modify_restaurant_item_category(self):
        """Testa se um superusuário consegue modificar o restaurante de uma categoria de item."""
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

        data = {'name': 'test_restaurant_add_2', 'description': 'None', 'cnpj': 11111111111111, 'postal_code': 11111111,
                'address_line1': 'None', 'city': 'None', 'state': 'ac', 'phone': 11111111111, 'table_set-0-capacity': '1',
                'table_set-0-available': True, 'table_set-0-number': '2', 'table_set-0-verification_code': '4321',}
        # Essas duas linhas são obrigatórias pq os campos de 'table' são ocultos qnd vai adicionar um restaurante.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = c.post('/admin/restaurant/restaurant/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um restaurante no painel do admin (algum campo está errado).')
        self.assertTrue(Restaurant.objects.filter(name='test_restaurant_add_2').exists(), 'O restaurante foi criado mas não foi adicionado ao banco de dados.')

        data = {'restaurant': '1', 'name': 'test_item_category_add', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')
        
        data = {'restaurant': '2', 'name': 'test_item_category_modify', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/1/change/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível modificar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_modify').exists(), 'A categoria de item foi modificada mas não foi alterada no banco de dados.')
        c.logout()


    def test_admin_item_page_up(self):
        """Testa se a página de item no painel do admin é acessível."""
        c = Client()
        logged_in = c.login(username=self.superuser_username, password=self.superuser_password)
        self.assertTrue(logged_in, 'Não foi possível entrar como super usuário.')

        response = c.get('/admin/restaurant/item/')
        self.assertEqual(response.status_code, 200, 'Não foi possível acessar a página de item no painel de admin.')
        c.logout()


    def test_admin_add_new_item(self):
        """Testa se um superusuário consegue adicionar um novo item."""
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
        
        data = {'restaurant': '1', 'name': 'test_item_category_add', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')
        
        data = {'name': 'test_item_add', 'description': 'None', 'category': '1', 'restaurant': '1', 'price': 12.3}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_add').exists(), 'O item foi criado mas não foi adicionado ao banco de dados.')
        c.logout()


    def test_admin_modify_item(self):
        """Testa se um superusuário consegue modificar um item."""
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
        
        data = {'restaurant': '1', 'name': 'test_item_category_add', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')
        
        data = {'name': 'test_item_add', 'description': 'None', 'category': '1', 'restaurant': '1', 'price': 12.3}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_add').exists(), 'O item foi criado mas não foi adicionado ao banco de dados.')
        
        data = {'name': 'test_item_modify', 'description': 'None', 'category': '1', 'restaurant': '1', 'price': 13.6}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_modify').exists(), 'O item foi modificado mas não foi alterado no banco de dados.')
        c.logout()


    def test_admin_modify_category_item(self):
        """Testa se um superusuário consegue modificar a categoria de um item."""
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
        
        data = {'restaurant': '1', 'name': 'test_item_category_add', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')

        data = {'restaurant': '1', 'name': 'test_item_category_add_2', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add_2').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')
         
        data = {'name': 'test_item_add', 'description': 'None', 'category': '1', 'restaurant': '1', 'price': 12.3}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_add').exists(), 'O item foi criado mas não foi adicionado ao banco de dados.')
        
        data = {'name': 'test_item_modify', 'description': 'None', 'category': '2', 'restaurant': '1', 'price': 13.6}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_modify').exists(), 'O item foi modificado mas não foi alterado no banco de dados.')
        c.logout()


    def test_admin_modify_restaurant_item(self):
        """Testa se um superusuário consegue modificar o restaurante de um item."""
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

        data = {'name': 'test_restaurant_add_2', 'description': 'None', 'cnpj': 11111111111111, 'postal_code': 11111111,
                'address_line1': 'None', 'city': 'None', 'state': 'ac', 'phone': 11111111111, 'table_set-0-capacity': '1',
                'table_set-0-available': True, 'table_set-0-number': '2', 'table_set-0-verification_code': '4321',}
        # Essas duas linhas são obrigatórias pq os campos de 'table' são ocultos qnd vai adicionar um restaurante.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = c.post('/admin/restaurant/restaurant/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um restaurante no painel do admin (algum campo está errado).')
        self.assertTrue(Restaurant.objects.filter(name='test_restaurant_add_2').exists(), 'O restaurante foi criado mas não foi adicionado ao banco de dados.')

        data = {'restaurant': '1', 'name': 'test_item_category_add', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')

        data = {'name': 'test_item_add', 'description': 'None', 'category': '1', 'restaurant': '1', 'price': 12.3}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_add').exists(), 'O item foi criado mas não foi adicionado ao banco de dados.')
        
        data = {'name': 'test_item_modify', 'description': 'None', 'category': '1', 'restaurant': '2', 'price': 13.6}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_modify').exists(), 'O item foi modificado mas não foi alterado no banco de dados.')
        c.logout()


    def test_admin_modify_restaurant_and_category_item(self):
        """Testa se um superusuário consegue modificar a categoria e o restaurante de um item."""
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

        data = {'name': 'test_restaurant_add_2', 'description': 'None', 'cnpj': 11111111111111, 'postal_code': 11111111,
                'address_line1': 'None', 'city': 'None', 'state': 'ac', 'phone': 11111111111, 'table_set-0-capacity': '1',
                'table_set-0-available': True, 'table_set-0-number': '2', 'table_set-0-verification_code': '4321',}
        # Essas duas linhas são obrigatórias pq os campos de 'table' são ocultos qnd vai adicionar um restaurante.
        data['table_set-TOTAL_FORMS'] = 1
        data['table_set-INITIAL_FORMS'] = 0
        response = c.post('/admin/restaurant/restaurant/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um restaurante no painel do admin (algum campo está errado).')
        self.assertTrue(Restaurant.objects.filter(name='test_restaurant_add_2').exists(), 'O restaurante foi criado mas não foi adicionado ao banco de dados.')

        data = {'restaurant': '1', 'name': 'test_item_category_add', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')

        data = {'restaurant': '2', 'name': 'test_item_category_add_2', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add_2').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')

        data = {'restaurant': '2', 'name': 'test_item_category_add_3', 'sort_order': 0,}
        response = c.post('/admin/restaurant/itemcategory/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar uma categoria de item no painel do admin (algum campo está errado).')
        self.assertTrue(ItemCategory.objects.filter(name='test_item_category_add_3').exists(), 'A categoria de item foi criada mas não foi adicionada ao banco de dados.')

        data = {'name': 'test_item_add', 'description': 'None', 'category': '1', 'restaurant': '1', 'price': 12.3}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_add').exists(), 'O item foi criado mas não foi adicionado ao banco de dados.')
        
        data = {'name': 'test_item_modify', 'description': 'None', 'category': '2', 'restaurant': '2', 'price': 13.6}
        response = c.post('/admin/restaurant/item/add/', data)
        self.assertEqual(response.status_code, 302, 'Não foi possível criar um item no painel do admin (algum campo está errado).')
        self.assertTrue(Item.objects.filter(name='test_item_modify').exists(), 'O item foi modificado mas não foi alterado no banco de dados.')
        c.logout()
