<h1 align="center">Jogo da velha</h1>
<p align="center">
  <img width="400px" src="./assets/demo.png">
</p>

## Sobre

Aplicação desenvolvida (front e back-end) com o intuito de realizar o jogo da velha em modo online em tempo real entre dois jogadores.

## Demonstação

A aplicação está hospedada no [Netlify](https://www.netlify.com/). Acesse o link [https://focused-clarke-38d320.netlify.app/](https://focused-clarke-38d320.netlify.app/) para executa-la.

## Tecnologias utilizadas

- [React](https://pt-br.reactjs.org/)
- [React Native Web](https://github.com/necolas/react-native-web)
- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [TypeORM](https://typeorm.io/#/)
- [Jest](https://jestjs.io/)
- [Socket.IO](https://socket.io/)

## Execução

_Tenha instalado em sua maquina o [Git](http://git-scm.com/) e [Node.js](http://nodejs.org/) 10.0.0 (ou superior). Caso prefira, instale o [Yarn](https://yarnpkg.com/)._

1. Fork este repositório e crie um novo branch — ou crie um novo branch caso tenha permissão.

2. Depois de obter sua cópia local, acesse cada pasta que tem na raiz da aplicação (backend, frontend e app) e instale suas dependências:

```sh
npm install
```

ou

```sh
yarn
```

3. No diretório `backend` crie os arquivos `.env.development`, `.env.test` e `.env.production`, com as variáveis e seus valores. Siga o exemplo `.env.example`

4. No diretório `frontend` crie o arquivo `.env`, com as variáveis e seus valores. Siga o exemplo `.env.example`

5. Acesse o diretório `backend` e execute o comando abaixo para executar o backend:

```sh
npm run dev:server
```

ou

```sh
yarn dev:server
```

5. Acesse o diretório `frontend` e execute o comando abaixo para executar a aplicação web:

```sh
npm start
```

ou

```sh
yarn start
```

## Testes

_Todos os arquivos de testes terminam com `.spec.tsx` ou `.spec.ts`_

Acesse o diretório `backend` ou `frontend` e use comando abaixo para executar os testes:

```sh
npm test
```

ou

```sh
yarn test
```

## Licença

[MIT](https://opensource.org/licenses/MIT)
