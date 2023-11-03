Rodar o sistema:
DOCKER:
1 - Configurar o .env do NodeJS, PyFastAPI e do PyFlask:
  possui o .env.example criar um arquivo .env copiar tudo para ele e preencher as variáveis.
  o banco de dados utilizado foi o disponibilizado pela empresa


2 - DOCKER -> Criar as imagens e os containers:
  Na pasta principal (desafiovisie) mesma pasta deste documento
  mesma que está o docker-compose.yaml
  
  rodar e esperar....: 
    docker-compose create --build


3 - Agora com os containers buildados e criados ativar o container do React (app-react) e ativar o da a api que quiser testar (1 por vez)

  REACT:
    up: docker start app-react 
    down: docker stop app-react
    
    Acessar telas no navegador:
    localhost:3000

  NODEJS: 
    up: docker start api-nodejs
    down: docker stop api-nodejs

  FLASK: 
    up: docker start api-flask
    down: docker stop api-flask

  FASTAPI: 
    up: docker start api-fastapi
    down: docker stop api-fastapi
    
    ver todas as rotas:
    acessar: localhost:3001/docs


Passo a passo sem docker:
1 - setar as variáveis de ambiente do Node Flask e FastAPI
2 - configurar os sistemas e rodar cada um:
  reactjs:
    cd /app    (entrar pasta react)
    yarn install
    yarn start

  nodejs:
    cd /api    (entrar na pasta node)
    npm install
    npm run start:dev

  pyFlask:
    cd /api_flask (entrar na pasta do flask)
    python3 -m venv venv   (criar a venv)
    source venv/bin/activate
    pip install -r requirements.txt
    python3 src/run.py

  pyFastAPI:
    cd /api_fastapi (entrar pasta do fastapi)
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python3 src/main.py



Endpoints das apis para teste em Postman/Insomnia:

- Criar Usuário:
POST: localhost:3001/employee/create
  body-JSON:
  {
    "nome":"Luis Andres",
    "rg":"",
    "cpf":"",
    "data_nascimento":"2001-02-02T00:00:00.000-02:00",
    "data_admissao":"2023-11-03T00:00:00.000Z",
    "funcao":""
  }

- Buscar Usuários
GET: localhost:3001/employee/all

- Buscar Usuário por ID
GET: localhost:3001/employee/{user_id}

- Editar Usuário:
PUT: localhost:3001/employee/update/{user_id}
  body-JSON:
  {
    "nome":"Luis Andres Dev",
    "rg":"",
    "cpf":"",
    "data_nascimento":"2001-02-02T02:00:00.000Z",
    "data_admissao":"2023-11-01T00:00:00.000-03:00",
    "funcao":"Desenvolvedor Backend"
  }

- Deletar Usuário:
DELETE: localhost:3001/employee/delete/{user_id}


  
