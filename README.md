# Fastify, Slonik, Typescript starter kit

## Core Commands
- Start Postgres DB (Docker)
    ```
    docker-compose up -d
    ```
- Transpile Typescript to Javascript
    ```
    yarn build
    ```
- Start server
    ```
    yarn start
    ```
- Start server in dev mode (hot reloading)
    ```
    yarn dev
    ```
- Run ESLint
    ```
    yarn lint
    ```

## Migrations

This starter kit uses the [Slonik Migrator](https://www.npmjs.com/package/@slonik/migrator) package. For more details visit the documentation.

### Create Migration
```
npx cross-env NODE_ENV=development yarn migrate create --name <schema-name>.sql
```

Modify the generated `sql` file as needed

### Run Migration
```
npx cross-env NODE_ENV=development yarn migrate up
```

### Rollback Migration
```
npx cross-env NODE_ENV=development yarn migrate down
```