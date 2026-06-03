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

DB_HOST=localhost<br>
DB_PORT=5432<br>
DB_USERNAME=ayubur<br>
DB_PASSWORD=pass1234<br>
DB_NAME=travel_blog<br>
ACCESS_SECRET=ACCESS_SECRET<br>
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
