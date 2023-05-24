# Webapp
Webapp é o projeto de backend em Django v4.2.1 com Django Rest Framework.

## Pre-Requisitos
- Docker
- Python 3

## Setup
Certifique-se que o Docker está instalado e executando:
```
docker info
```

Dentro da pasta `pocket-menu/webapp`, crie uma cópia do arquivo `sample.env` e renomeie para `.env`. Em seguida, construa e suba os containers de banco de dados (db) e aplicação Django (web):
```
docker-compose up --build -d web
```

Acesse o bash do container web para aplicar as migrações do banco de dados:
```
docker-compose exec web /bin/sh
python manage.py migrate
```

Ainda no terminal do container web, crie um usuário admin do Django:
```
python manage.py createsuperuser
```

Por fim, para testar se a aplicação está rodando com sucesso, acesse `localhost:8000/admin` e faça o login com seu superusuário criado na etapa anterior.
