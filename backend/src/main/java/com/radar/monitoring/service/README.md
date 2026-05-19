# `service` Folder

This folder contains the business logic of the backend.

Services sit between controllers and repositories.

Controllers receive HTTP requests. Repositories talk to the database. Services decide what should happen.

Current files:

```text
RadarAlertService.java
RadarStationService.java
ResourceNotFoundException.java
TelemetryService.java
```

## `RadarStationService.java`

Handles radar station behavior.

Responsibilities:

- List all radar stations.
- Find one radar station by ID.
- Create a radar station.
- Prevent duplicate radar station codes.
- Update radar status.
- Convert `RadarStation` entities to `RadarStationResponse` DTOs.

This service uses `RadarStationRepository`.

## `TelemetryService.java`

Handles telemetry behavior.

Responsibilities:

- Return the latest telemetry readings.
- Create a new telemetry reading.
- Check that the radar station exists before saving telemetry.
- Convert `TelemetryReading` entities to `TelemetryResponse` DTOs.

This service uses:

- `RadarStationService`
- `TelemetryReadingRepository`

## `RadarAlertService.java`

Handles alert behavior.

Responsibilities:

- List alerts.
- Filter alerts by status.
- Create alerts for radar stations.
- Acknowledge alerts.
- Convert `RadarAlert` entities to `AlertResponse` DTOs.

This service uses:

- `RadarStationService`
- `RadarAlertRepository`

## `ResourceNotFoundException.java`

Custom exception used when a requested resource does not exist.

Example:

```text
Radar station 5 was not found
```

The global API exception handler catches this and returns a `404 Not Found` response.

## Rule For This Folder

Services are where backend decisions belong.

Good service responsibilities:

- Validating business rules
- Calling repositories
- Coordinating multiple entities
- Throwing meaningful exceptions
- Returning DTOs to controllers

Services should not know about frontend UI details.
