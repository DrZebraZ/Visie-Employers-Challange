FROM node:18.12.0-alpine

WORKDIR /usr/app/

COPY ./app ./app

WORKDIR /usr/app/app

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]

# RODAR FORA DA PASTA APP
# docker build -t visie:app -f ./app/Dockerfile .    
# docker run --restart always --ip 0.0.0.0 -p 3000:3000 visie:app
