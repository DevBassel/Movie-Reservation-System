## [Movie Reservation System (nestjs)](https://roadmap.sh/projects/movie-reservation-system)

#### Build a system that allows users to reserve movie tickets.

#

# Tech Stack

- Nodejs
- TypeSript
- Nestjs
- Postgresql
- Stripe (payment gateway)

##

# Features

- [x] User Authentication and Authorization
  - login
  - register
  - JWT Authorization
- [x] Roles (super-admin, admin, user)
  - super-admin can up user to admin And vice versa
- [x] Movie Management

  - super-admin and admin can create, update and delete movies
  - Movies are categorized by genre.
  - user can filter movies by ( name, category, showTime and between tow dates)
  - pagination response for optimization

- [x] Firebase integration
  - to uploade movies poster as (image or video)
- [x] Reservation Management

  - user can create order for an movie and payment
  - after payment success user resevied and email with tikck details
  - user can cacele reservat movie and refund mony

- [x] Scheduling
  - An hour before the movie is shown, an email is sent to users to remind them of the show time.efore
- [x] Emails Notifications
  - send emails to user (create order, payment success, refund order and movie show time)
- [x] Integtation Testing (jest)
  - created a test for all service and controllers in app

## How To Install

```bash
> npm i -g pnpm
> pnpm install
```

## Run App (in dev env)

```bash
> pnpm start:dev
```

## Run App (in dev production)

```bash
> pnpm build
> pnpm start:prod
```

# Env file

```js
// APP
PORT: number;
JWT_KEY: string;
NODE_ENV: 'test' | 'dev' | 'prod';
HOST: string;
// DB
DB_NAME: string;
DB_HOST: string;
DB_PORT: number;
DB_USERNAME: string;
DB_PASSWORD: string;
// payment
STRIPE_SK: string;
STRIPE_PK: string;
STRIPE_WEBHOOK_SK: string;
// email smtp
EMAIL_USER: string;
EMAIL_SK: string;
```

#

#### With thanks and appreciation to [roadmap.sh](https://roadmap.sh/)

## [Project Page](https://roadmap.sh/projects/movie-reservation-system)
