# SAFEBODA NODE BACKEND INTERVIEW

Backend API application to manage motorcycle drivers, passengers and monitor the current ongoing rides.

## Environment variables

This application needs environment variables in order to operate correctly. Create a file at the root folder of this application and name is `.env`, then add the variables as shown in the example below.

```bash
NODE_ENV=development
PORT=2000
ROOT_PATH=/

DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=safeboda

JWT_SECRET_KEY=ThisIsSecret

ADMIN_EMAIL=okidicyril@gmail.com
ADMIN_PASSWORD=password
```

> `NODE_ENV` accepts the following; `development`, `test` and `production`

## Commands

> Before running any of the commands listed below, ensure you have installed all the dependencies by running;

```bash
# Install all dependencies

npm install
```

The following commands can be executed at the terminal. Cd into the application root folder, then type `npm run` followed by either of the following;

| Command  | Description                                   |
| -------- | --------------------------------------------- |
| test     | Executes all test file in the `tests` folder. |
| dev      | Runs the application in development mode.     |
| migrate  | Run all migrations.                           |
| rollback | Rollback all migrations.                      |

```bash
# Example command

npm run dev
```

## Request flow

## End-points
