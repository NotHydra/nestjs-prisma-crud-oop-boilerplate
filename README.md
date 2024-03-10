## Tech Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Description

OOP boilerplate for CRUD RestAPI using NestJS Framework and Prisma ORM

Full implementation can be seen [here](https://github.com/trashtrack-team/trashtrack)

## Installation

```bash
$ yarn install
```

## Prisma Setup

```bash
$ yarn run prisma:generate
$ yarn run prisma:seed #optional
```

## Prisma Schema Changes

```bash
$ yarn run prisma:migrate --name=migrate-name-here
```

## Development

```bash
$ yarn run start:dev
```

## Production

```bash
$ yarn run build
$ yarn run start:prod
```
