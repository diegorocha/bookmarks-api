# bookmarks-api

## Sobre o projeto

O projeto consiste uma aplicação api rest  para salvar booksmarks dos usuários.

Repositório do projeto client dessa API (feito em Python + Django) [https://github.com/diegorocha/bookmarks-client/](https://github.com/diegorocha/bookmarks-client/)

## Observações

Optei pelo desenvolvimento com Nodejs pois sempre tive curiosidade de o conhecer melhor (a maioria das apis que faço é com Python, seja Django ou Flask). Entretanto não estou tão familiarizado e alguma coisa pode ter passado despercebido.

Utilizei a versão v7.8.0 do Nodejs e o framework express.

Um banco não SQL atenderia muito bem esse projeto, mas pensando na facilidade de desenvolvimento, optei por utilizar o SQlite, e por consequência um ORM. Dentre as opções que pesquisei eu optei pelo sequelize.

Para lidar com a autenticação dos usuários eu utilizei o jwt-simple, que utiliza o protocolo Json Web Token.

Me esforcei pra deixar a cobertura de testes minimamente decente, mas acredito que ainda faltam bastantes testes unitários para serem feitos.

## Instalação

Para executar o projeto localmente basta clonar o repositório.

Instalar as depências do node com o npm.
```shell
npm install
npm start
```

## Testes

Para executar os testes unitários basta rodar o comando test do npm

```shell
npm test
```

Esse comando, além de chamar a suite de testes mocha, gera o relatório (na tela) da cobertura de testes.

## Docker

Para executar o projeto dentro de um container docker:

```shell
docker build -t bookmarks-api .
docker run -p 5000:5000 -d bookmarks-api
```

O projeto estará disponível através de http://localhost:5000/ ou http://container-ip:5000/
