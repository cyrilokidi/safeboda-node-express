# SAFEBODA NODE BACKEND INTERVIEW

Backend API application to manage motorcycle drivers, passengers and monitor the current ongoing rides.

## Requirements

- Node (v14.15.0 at the time of development)
- PostgreSQL (10.15 at the time of development)

## Setup

Create a file named `.env` at the application root folder and add environment variables as shown in the example below.

```bash
# either; development, test or production
# use test when running test to disable printing logs on termminal

NODE_ENV=development

PORT=2000

ROOT_PATH=./

# Database (postgres) config. variables

DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=safeboda

# JWT secret key

JWT_SECRET_KEY=ThisIsSecret

# Default admin

ADMIN_EMAIL=okidicyril@gmail.com
ADMIN_PASSWORD=password
```

## Commands

> Run `npm install`, then `npm run migrate` before running any other commands.

- `npm install` to install all dependencies required.
- `npm run migrate` to run all migration files.
- `npm run rollback` to rollback all migrations.
- `npm run start` to start the application.
- `npm run dev` to run the application in development mode. Prints log events on the terminal.
- `npm run test` to execute all test files in the `tests` folder.

## Request flow

A typical client request goes through the process listed below.

| Step        | Description                                                |
| ----------- | ---------------------------------------------------------- |
| app         | Main entry point into the application.                     |
| routes      | Exposes all application routes (end-points).               |
| controllers | Controls the order of processing a request.                |
| services    | Accepts client request, then returns appropriate response. |

## End-points

### Auth

Authentication end-points.

> Only requests handled by end-points in this section do not need authorization.

[more](/docs/auth.md)

### Driver

Driver management.

[more](/docs/driver.md)

### Passenger

Passenger management.

[more](/docs/passenger.md)

### Ride

Ride management.

[more](/docs/ride.md)
