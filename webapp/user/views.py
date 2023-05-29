from django.contrib import messages
from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout

from .forms import NewUserForm, LoginForm

def register_view(request: HttpRequest) -> HttpResponse:
    """Processa o formulário de cadastro do usuário.

    Parameters
    ----------
    request : HttpRequest
        A requisição feita.

    Returns
    -------
    HttpResponse
        A resposta com base na requisição feita.
    """
    # Verifica o tipo de requisição e o formulário, se
    # ambos forem válidos um novo usuário é cadastrado no BD,
    # mostra uma mensagem de sucesso e redireciona para a
    # página de login.
    if request.method == 'POST':
        form = NewUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Usuário cadastrado com sucesso!")
            return redirect('login')
    else:
        form = NewUserForm()
    
    return render(request=request, template_name="register.html", context={'form': form})

def login_view(request: HttpRequest) -> HttpResponse:
    """Processa o formulário de login do usuário.

    Parameters
    ----------
    request : HttpRequest
        A requisição feita.

    Returns
    -------
    HttpResponse
        A resposta com base na requisição feita.
    """
    # Verifica se as informações contidas no formulário
    # estão de acordo com as do BD, isto é feito pelo
    # 'authenticate', se o login for bem sucedido, o
    # usuário é redirecionado para a página home.
    if request.method == 'POST':
        form = LoginForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request=request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, "Você agora está logado!")
                return redirect('home')
    else:
        form = LoginForm(request)

    return render(request, 'login.html', {'form': form})

@login_required
def logout_view(request: HttpRequest) -> HttpResponse:
    """Encerra a sessão do usuário logado.

    Parameters
    ----------
    request : HttpRequest
        A requisição feita.

    Returns
    -------
    HttpResponse
        A resposta com base na requisição feita.
    """
    logout(request)
    messages.success(request, "Você saiu da sua conta!")
    return redirect('home')