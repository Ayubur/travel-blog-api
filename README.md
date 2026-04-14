# Travel Blog API (NestJS Auth)

Travel Blog API built with NestJS, PostgreSQL, JWT, and bcrypt.

## Features

- User registration
- User login
- JWT authentication (access + refresh tokens)
- Protected routes
- PostgreSQL with TypeORM


## Tech Stack

- NestJS
- PostgreSQL
- TypeORM
- JWT
- bcrypt


## Environment Variables

Create a `.env` file:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ayubur
DB_PASSWORD=pass1234
DB_NAME=travel_blog

ACCESS_SECRET=ACCESS_SECRET
REFRESH_SECRET=ACCESS_SECRET


## Installation

npm install


## Run Project

npm run start:dev


## API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout