FROM node:18.12.0-alpine

WORKDIR /usr/app/

COPY ./api ./api

WORKDIR /usr/app/api

RUN yarn install

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]

# RODAR FORA DA PASTA API
# docker build -t visie:api -f ./api/Dockerfile .    
# docker run --restart always --ip 0.0.0.0 -p 3001:3001 visie:api
