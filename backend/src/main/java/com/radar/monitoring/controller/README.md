# `controller` Folder

This folder contains REST controllers.

Controllers are the entry points of the API. They receive HTTP requests from clients such as the React frontend, Postman, or `curl`, then call services to perform the actual work.

Current files:

```text
ApiExceptionHandler.java
HealthController.java
RadarAlertController.java
RadarStationController.java
TelemetryController.java
```

## `HealthController.java`

Provides a simple health endpoint:

```text
GET /api/health
```

This is used to check if the backend is running.

## `RadarStationController.java`

Handles radar station endpoints:

```text
GET  /api/radars
GET  /api/radars/{id}
POST /api/radars
PUT  /api/radars/{id}/status
```

This controller is responsible for creating radar stations, listing them, finding one by ID, and updating a radar status.

It does not directly access the database. It calls `RadarStationService`.

## `TelemetryController.java`

Handles telemetry endpoints:

```text
GET  /api/telemetry/latest
POST /api/telemetry
```

Telemetry represents operational readings from radar stations, such as:

- Signal strength
- CPU load
- Temperature

This controller calls `TelemetryService`.

## `RadarAlertController.java`

Handles alert endpoints:

```text
GET   /api/alerts
GET   /api/alerts?status=OPEN
POST  /api/alerts
PATCH /api/alerts/{id}/acknowledge
```

Alerts represent problems or important radar events. This controller calls `RadarAlertService`.

## `ApiExceptionHandler.java`

Handles API errors globally.

Instead of letting Spring return default error responses, this class returns cleaner JSON responses for:

- Not found errors
- Bad requests
- Validation errors

## Rule For This Folder

Controllers should stay thin.

They should:

- Accept HTTP requests
- Validate request bodies
- Read path variables and query parameters
- Call a service
- Return the service result

They should not contain database logic or complicated business rules.
