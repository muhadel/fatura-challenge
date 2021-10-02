#### Table of contents

1. [Overview](#fatura-backend-challenge)
   - [Features](#features)
   - [Dependencies](#dependencies)
2. [Repo structure](#repo-structure)
3. [MongoDB Data Modelling](#mongodb-data-modelling)
4. [How to Install](#how-to-install)
5. [Run app locally](#run-app-locally)
6. [Run app by docker-compose](#run-app-by-docker-compose)
7. [E2E tests](#e2e-tests)
8. [Swagger Documentation](#swagger-documentation)

## Fatura Backend Challenge


When you start the application you will find two users in the database, the first one has full access to any resource and the other one has no rules.
Also, you can create your own user by signing up and assign some rules to yourself.

| Username | Password   | Permissions          | Resource   |
| :--------| :--------: | :-----------------:  |:----------:|
| sysuser  | P@ssw0rd   | Manage (Full Access) | Role - Auth|
| sysuser1 | P@ssw0rd   | -                    | -


## Features

- Service is responsible for authenticate and login users.
- Service is responsible for validating whether logged user is permitted to do specific action or not.
- Service is resbonsible for loggin users out from the system.

## Dependencies

| Dependencies |  Version   |
| :----------- | :--------: |
| Node.js      | >= 12.13.1 |
| Typescript   |  >= 4.3.5  |
| MongoDB      |  >= 4.2.1  |
| @nestjs/cli  |  >= 8.0.0  |

## Repo structure:

```
- src/
   - config/
   - decorators/
   - guards/
   - seeders/
   - shared/
   - types/
   - modules/
       - auth/
       - user/
       - role/
       - revoked-token/
       - database/
```

## MongoDB Data Modelling:
![image](https://user-images.githubusercontent.com/32979588/135713111-8bbcc248-8292-496a-96d3-3c084d16309f.png)


## How to Install

```bash
$ npm i -g @nestjs/cli
$ npm install
$ mv .env.example .env
```

## Run app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run app by docker-compose
```bash
$ docker-compose up --build
```

## E2E tests

```bash
# e2e tests
$ npm run test:e2e
```
![image](https://user-images.githubusercontent.com/32979588/135719661-96384d8f-c59c-4c03-bcc7-99c5071bf55a.png)


## Swagger Documentation

You can access Swagger documentation via [http://localhost:5000/swagger/](http://localhost:5000/swagger/)
![image](https://user-images.githubusercontent.com/32979588/135721877-a3a27cbf-887b-4ee1-a42d-7c4133469ec2.png)

