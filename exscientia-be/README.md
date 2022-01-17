# exscientia-be (back-end)

This repo hosts the entire back-end needed for the Exscientia code challenge. The main back-end code is in the `exscientia-go-be` directory which holds a simple Go `net/http`-based API. See `exscientia-go-be/README.md` for details.

This directory exists above the main `exscientia-go-be` directory just as a way to separate out the server implementation from the orchestration of the back-end services.

## Services

The back-end for this project is only composed of two main services:

- Go API server
- Mongo database

Both are dockerized services, and so can be brought up together easily using the `docker-compose.yaml` file (see **Usage**).

To aid in this, a `Makefile` is defined which holds a target for building the Go API server docker image; this can be achieved with `make docker`.

The mongo database will be seeded using the `db/seed.js` script on startup, and so no manual effort should be required to get this up and running.

## Usage

- Build the API server image with `make docker`.
- Configure environment variables in `docker-compose.yaml` if required.
- Bring up the server and database with `docker-compose up` (by default, the server will be brought up on `localhost:8080`).

## Environment Configuration

Various environment variables exist to customise the Go http server, which can be adjusted in the `docker-compose.yaml` file:

- `DB_HOST`: Hostname for the database.
- `DB_PORT`: Port to access the database.
- `DB_USER`/`DB_PASSWORD`: Credentials the Go API server will use to access the database (**\***). These must match the credentials used in the seed script, `db/seed.js`.
- `DB_DATABASE`: The default database name.
- `LOG_LEVEL`: This application uses the [Zerolog logging package](https://github.com/rs/zerolog), and so log levels can be specified for different environments (see [Leveled Logging](https://github.com/rs/zerolog#leveled-logging)).
- `SERVER_HOST`: The hostname the Go server will run on.
- `SERVER_PORT`: The _internal_ port the Go server runs on; needs to be mapped appropriately to the host port for outside communication.

**\* - In a real application, credentials such as `DB_PASSWORD` would be stored outside of version control, and would be configured in CI secrets for use in pipelines. For this prototype-style project, however, limited damage can occur by leaving these credentials in version control.**
