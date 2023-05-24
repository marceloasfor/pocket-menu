from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

class NewUserForm(UserCreationForm):
	"""Cria uma formulário de cadastro.

	Parameters
	----------
	UserCreationForm : class
		Classe base para criação de formulários
		para cadastro/criação de novos usuários.
	"""
	# Define os campos 'username' e 'email' como obrigatórios.
	email = forms.EmailField(required=True)

	class NewUserFormMeta:
		"""Responsável pelo armazenamento de metadados,
		como por exemplo: 'username', 'email', 'password1' e 'password2'."""
		model = User
		fields = ("username", "email", "password1", "password2")
	
	class Meta(NewUserFormMeta, UserCreationForm.Meta):
		pass

	def save(self, commit=True):
		"""Salva o novo usuário, se for válido, no BD."""
		user = super(NewUserForm, self).save(commit=False)
		user.email = self.cleaned_data['email']
		if commit:
			user.save()
		return user

class LoginForm(AuthenticationForm):
	"""Cria uma formulário para autenticação/login.

	Parameters
	----------
	AuthenticationForm : class
		Classe base para criação de formulários
		para autenticação.
	"""
	# Cria dois campos, 'username' e 'password', respectivamente.
	username = forms.CharField(label='Usuário')
	password = forms.CharField(label='Senha', widget=forms.PasswordInput)