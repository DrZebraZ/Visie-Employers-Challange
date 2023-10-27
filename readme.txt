Desafio Visie -> resolução Luis Andres

Primeiramente antes de tudo gostaria de agradecer pela oportunidade! 
Foi muito divertido codar este sistema. 

Ja deixando claro não lembrava muito do flask e nunca havia utilizado o FastAPI
Decidi fazer o back-end tanto em NodeJS com o Fastify quanto Python com o Flask e o FastAPI já que vocês trabalham com estas stacks
Para o front foi React ---> fazia alguns meses que não utilizava também
o que estava mais aquecido aqui era o NodeJS
Enfim... boa validação do sistema!!!

Se já tiver o Docker e o docker-compose vai ser mais fácil...


Segue o passo a passo que é para ser sucesso! 


Qualquer duvida/pergunta só chamar


Rodar o sistema:

1 - Configurar o .env do NodeJS, PyFastAPI e do PyFlask:
  possui o .env.example criar um arquivo .env copiar tudo para ele e preencher as variáveis.
  o banco de dados utilizado foi o disponibilizado pela empresa


2 - DOCKER -> Criar as imagens e os containers:
  Na pasta principal (desafiovisie) mesma pasta deste documento
  mesma que está o docker-compose.yaml
  
  rodar e esperar....: 
    docker-compose create --build


3 - Agora com os containers buildados e criados ativar o container do React (app-react) e ativar o da a api que quiser testar (1 por vez)
  não configurei o React para buscar a API por outra porta então ele está apenas fazendo request na API localhost:3001

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


Endpoints das apis para teste em Postman/Insomnia:

Todas apis possuem mesmo endpoints possuindo uma ou outra diferença no retorno de erro
PS: o front está configurado para mandar para o back-end a data da forma correta e vice-versa
para editar ou criar por fora não se pode mandar em formato dd/MM/yyyy ele tem que ser em dateIsoString
no front aparece estar criando como dd/MM/yyyy mas é alterado antes do envio

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


Obrigado!!!
Lembrando que estou disponível para sanar dúvidas.
Luis Andres