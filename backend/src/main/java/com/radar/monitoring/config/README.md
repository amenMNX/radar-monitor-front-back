# `config` Folder

This folder contains Spring configuration classes.

Configuration classes tell Spring Boot how the application should behave at startup or during runtime.

Current files:

```text
CorsConfig.java
DataSeeder.java
```

## `CorsConfig.java`

This file configures CORS for the API.

CORS is needed because the React frontend and Spring Boot backend run on different ports during development.

For example:

- React frontend: `http://localhost:5173`
- Spring Boot backend: `http://localhost:8080`

Browsers block cross-origin requests by default. `CorsConfig` tells the browser that the frontend is allowed to call backend routes under:

```text
/api/**
```

Allowed frontend origins:

```text
http://localhost:5173
http://localhost:3000
```

This is what prepares the backend to be called from the React app.

## `DataSeeder.java`

This file inserts demo data when the backend starts.

It creates sample:

- Radar stations
- Telemetry readings
- Alerts

This is useful because the API immediately returns real-looking data without needing manual database inserts.

The seeder only runs when the radar station table is empty. That prevents it from duplicating demo records every time the application restarts.

## When To Add Files Here

Add files to this folder when you need to configure application-wide behavior, such as:

- CORS rules
- Security settings
- Startup data
- Bean configuration
- External service setup
