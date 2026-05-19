# `dto` Folder

This folder contains DTOs.

DTO means Data Transfer Object.

DTOs define the shape of data entering or leaving the API. They are used so the frontend does not need to work directly with database entities.

Current files:

```text
AlertRequest.java
AlertResponse.java
ApiErrorResponse.java
RadarStationRequest.java
RadarStationResponse.java
RadarStatusRequest.java
TelemetryRequest.java
TelemetryResponse.java
```

## Request DTOs

Request DTOs describe data sent from the frontend to the backend.

Examples:

- `RadarStationRequest`: used when creating a radar station.
- `RadarStatusRequest`: used when updating radar status.
- `TelemetryRequest`: used when creating telemetry data.
- `AlertRequest`: used when creating an alert.

Request DTOs include validation annotations such as:

```java
@NotBlank
@NotNull
@Min
@Max
@Positive
```

These annotations help reject invalid API input before the service layer runs.

## Response DTOs

Response DTOs describe data returned from the backend to the frontend.

Examples:

- `RadarStationResponse`
- `TelemetryResponse`
- `AlertResponse`

These objects keep API responses clean and prevent exposing unnecessary internal entity details.

## Error DTO

`ApiErrorResponse` defines the shape of error responses.

It includes:

- Timestamp
- HTTP status code
- Error name
- Message
- Validation errors

## Why DTOs Are Useful

DTOs make the API safer and easier to change.

The backend can keep database entities internal while exposing a frontend-friendly JSON format.

## Rule For This Folder

DTOs should be simple.

They should contain data fields and validation rules, not business logic or database access.
