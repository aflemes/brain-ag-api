<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# AG-API

## Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL** (produção)
- **Jest** (testes automatizados)
- **Supertest** (testes E2E)
- **Swagger** (documentação automática)

## Diagrama das Tabelas (Entidades)

```mermaid
erDiagram
    PRODUTOR ||--o{ PROPRIEDADE : possui
    PROPRIEDADE ||--o{ CULTURA_PLANTADA : possui
    SAFRA ||--o{ CULTURA_PLANTADA : possui
    CULTURA ||--o{ CULTURA_PLANTADA : possui

    PRODUTOR {
        int id PK
        string nome
        string documento
    }
    PROPRIEDADE {
        int id PK
        string nome
        string cidade
        string estado
        float area_agricultavel
        float area_vegetacao
        float area_total
        int produtor_id FK
    }
    SAFRA {
        int id PK
        string nome
    }
    CULTURA {
        int id PK
        string nome
    }
    CULTURA_PLANTADA {
        int id PK
        float area_plantada
        int cultura_id FK
        int safra_id FK
        int propriedade_id FK
    }
```

---
### O projeto está publicando no seguinte URL:

ag-ui
https://brain-ag-ui-production.up.railway.app/

ag-api
https://brain-ag-api-production.up.railway.app/

swagger
https://brain-ag-api-production.up.railway.app/api



## Como rodar o projeto

1. Instale as dependências:
   ```sh
   npm install
   ```

2. Rode a aplicação:
   ```sh
   npm run start:dev
   ```

---

## Acessando o Swagger

Após rodar a aplicação, acesse a documentação interativa em:

```
http://localhost:3000/api
```

---

## Rodando os Testes

- **Testes unitários e integrados:**
  ```sh
  npm test
  ```

- **Testes E2E:**
  ```sh
  npm test
  # ou
  npx jest src/test/
  ```

Os testes E2E utilizam banco de dados em memória (pg-mem), não afetando seu banco real.

---

## Estrutura dos Testes E2E

Os arquivos de teste E2E estão em `src/test/` e seguem o padrão:
- `safra.e2e.int.spec.ts`
- `cultura.e2e.int.spec.ts`
- `produtor.e2e.int.spec.ts`
- `propriedade.e2e.int.spec.ts`
- `cultura-plantada.e2e.int.spec.ts`

Cada arquivo cobre os métodos principais (POST, GET, PUT/PATCH, DELETE) dos respectivos controllers.

---

## Scripts Úteis

- `npm run start:dev` — inicia o servidor em modo desenvolvimento
- `npm run test` — executa todos os testes
- `npm run lint` — executa o linter

---

## Observações

- Para acessar o Swagger, a aplicação deve estar rodando.
- Os endpoints seguem o padrão RESTful.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
