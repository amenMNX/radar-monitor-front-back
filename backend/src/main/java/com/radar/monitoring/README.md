# `com/radar/monitoring` Package Folder

This is the main Java package for the Spring Boot backend.

It contains the main application class:

```text
RadarMonitoringApplication.java
```

That class starts the backend with:

```java
SpringApplication.run(RadarMonitoringApplication.class, args);
```

Because this is the root package of the application, Spring Boot scans this folder and all child folders for Spring components.

The child folders separate responsibilities:

- `config`: application setup and startup configuration.
- `controller`: REST API endpoints.
- `domain`: database entities and enums.
- `dto`: request and response objects.
- `repository`: database access interfaces.
- `service`: business logic.

This package is the center of the backend. Most new backend features should be added inside one or more of these child folders.
