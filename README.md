# Instruction to configure the project

Product Management is built using a Nest.js, TypeScript, PostgreSQL.
It contains the API to service the backend.

Pre-requisites:

- yarn

## Setting up configurations

Create a .env file at the root of the project structure

Put below connection details.

```sh
DATABASE_URL="postgresql://postgres:password@localhost:5432/product-management-test?schema=public"
```

Change postgres with your own PG name
Change password with your own PG password

## Bootstrap the project

```sh
yarn install
```

## (CONDITIONAL STEP) - Migrate tables (only if required, otherwise skip this step.)

```sh
npx prisma migrate dev --name init
```

## (CONDITIONAL STEP) - - Reset seeds (only if required, otherwise skip this step.)

```sh
npx prisma migrate reset --force init
```

## Start Backend

```sh
yarn start:dev
```

# EXTRAS

### Postman Collection

In root find the Postman collection for this project product_management.postman_collection.json
Import this to your Postman to get started with testing API endpoints via Postman.

### Example Endpoints

http://localhost:8080/product

# EXPLANATIONS

### How does Prisma ORM help?

Prisma helps with defining a clear modular approach with handling the SQL queries in elegant way that clears out the bloated raw SQL queries, which at the same time by having a readable documentation helps the developer to find and manage things easily. Also managing the DB connection, models, migrations, seeds with few commands gives the developer a huge benefit of speed and efficiency.
