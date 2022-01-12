# SAFEBODA NODE BACKEND INTERVIEW

Backend API application to manage motorcycle drivers, passengers and monitor the current ongoing rides.

## Setup

Create a file named `.env` at the application root folder and add environment variables as shown in the example below.

```bash
# either; development, test or production
# use test when running test to disable printing logs on termminal

NODE_ENV=development

PORT=2000

ROOT_PATH=/

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

Then run `npm install` command to install all the required dependencies.

## Commands

The following commands can be executed at the terminal. Cd into the application root folder, then type `npm run` followed by either of the following commands;

| Command  | Description                                   |
| -------- | --------------------------------------------- |
| start    | Start application.                            |
| test     | Executes all test file in the `tests` folder. |
| dev      | Runs the application in development mode.     |
| migrate  | Run all migrations.                           |
| rollback | Rollback all migrations.                      |

```bash
# Example command

npm run start
```

## Request flow

| Step        | Description                                                |
| ----------- | ---------------------------------------------------------- |
| app         | Main entry point into the application.                     |
| routes      | Exposes all application routes (end-points).               |
| controllers | Controls the order of processing a request.                |
| services    | Accepts client request, then returns appropriate response. |

## End-points

### Auth

Authentication end-points.

[more](/docs/auth.md)

### Driver

Driver management.

[more](/docs/driver.md)
