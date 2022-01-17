# exscientia-go-be

A simple HTTP server is used to communicate with the database, seeded with the provided data. For usage instructions, please view the `README.md` file found at the root of this project.

Note, I have used comments rather liberally in the codebase to explain decisions or elaborate on how I would go about improving a section.

## Go Packages

- `config`: Responsible for parsing environment variables and defining a struct containing application services used across the server (e.g. logger, db client).
- `database`: Defines the db Client interface allowing the application to not be reliant upon a single DB provider. Also contains sub-packages detailing db-specific implementation (e.g. `mongodb`).
- `models`: Defines the shape of data used in business logic of the application.
- `server`: Contains detail of server routing and handlers.
- `utils`: Package for misc. helper functions which may be used across the application; should have no dependencies on other packages.

## Architecture Decisions

The above package structure allows the system to stay relatively de-coupled (e.g. relying on an interface of the DB client rather than mongo-specific implementation). This also has the benefit of allowing the system to be heavily customisable without having to affect business logic too much.

One area in which this is _not_ the case, however, is with the `bson`-specific models found in the `models` package. Ideally, there would be some internal representation of a model which is used in all business logic and is not dependent on a specific API. For instance, there could be a mongo-specific `Compound` model which is decoded into when accessing the mongo database, and then this could be converted into the business-logic-specific `Compound` model before leaving the mongo-specific package. This would allow ultimate flexibility with regards to decoupling business logic from implementation details.

I tried to use a minimum number of dependencies to keep the project lightweight (e.g. lightweight env parser and logger used), while still providing enough that the project can grow if needed (e.g. the use of `gorilla/mux` to handle the eventual need for routing parameters like `example.com/compounds/{id}` which most APIs have).

## Improvements

Mainly due to time constraints, there are many areas of this application which could be improved upon - especially if this was to be maintained for a long period of time.

- **API Models mixing with business logic models**: Explained above.
- **All-or-nothing requests**: One can either request the entire set of compounds, including assay results, or none of it. Ideally, this would be structured in a more RESTful way where one could make multiple requests to get different parts of the data. This would make the queries much faster.
- **Contexts**: The details of Go contexts have been largely ignored for this project, with `context.Background()` and `context.TODO()` taking the place of more effective contexts (e.g. contexts with timeouts).
- **Ugly seeding**: The seeding script is largely hidden by all the seeding data defined in the same file (`db/seed.js`). This was because I was unable to import a JSON/JS file from a seed script within Mongo, and leaving it in the same scope as the seed script was the easiest way to seed.
- - **Testing**: Due to time constraints, testing has not been properly implemented. As this is mainly an API service, the bulk of functional testing would be done via an API testing tool like Postman or Insomnia, with a collection used to validate responses given a request. An environment variable could be set in the `docker-compose` file to facilitate this (e.g. a testing database used with set data). Integration testing could be done by mocking/stubbing out some database calls.
- **Deployment**: This API could be deployed somewhere like Heroku, with a Mongo server being started similarly or using a SaaS offering like MongoAtlas.
- **No full CRUD functionality**: As an API, this is rather limited. Ideally, there would be routes allowing more information on a specific compound (e.g. `/compounds/{id}`), and full CRUD functionality would exist whereby users (with the appropriate permissions) could save compounds to the database, or edit/delete existing ones.
- **Little security features**: The lack of authentication/authorization leaves this API open to be accessed by anyone with the correct URL, which is a large security risk. Furthermore, the API CORS config is set to a wildcard which further increases attack surface area for this API.

I'm sure there are many more improvements to be made on this small application, which would become especially apparent as it scales, however these were the main ones that jumped out to me when reviewing this.
