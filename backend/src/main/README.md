# `src/main` Folder

This folder contains the production code for the backend.

It is split into:

- `java`: Java source files for the Spring Boot application.
- `resources`: configuration files loaded when the application starts.

Anything inside `src/main` becomes part of the runnable application. For example, the REST controllers, services, entities, repositories, and `application.yml` configuration are all part of the backend when it starts with `mvn spring-boot:run`.

This folder does not contain tests. Tests belong in `src/test`.
