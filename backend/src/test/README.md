# `src/test` Folder

This folder contains automated tests for the backend.

The structure mirrors `src/main`, but test code is kept separate from production code.

Tests are run by Maven with:

```powershell
mvn test
```

Keeping tests here lets the backend verify that the application starts correctly and that controllers, services, and repositories behave as expected.

At the moment, the project has a basic Spring Boot context test. More tests can be added later for API endpoints and service logic.
