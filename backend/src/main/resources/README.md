# `src/main/resources` Folder

This folder contains runtime configuration files for the Spring Boot backend.

The main file here is:

```text
application.yml
```

That file configures:

- The backend server port: `8080`
- The application name
- The H2 in-memory database
- The H2 console URL
- JPA and Hibernate behavior
- Actuator health/info endpoints

Files in `resources` are copied to the application classpath when the backend is built. Spring Boot automatically reads `application.yml` during startup.

This is the right place for backend configuration, not Java business logic.
