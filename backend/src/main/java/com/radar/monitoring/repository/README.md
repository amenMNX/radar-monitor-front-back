# `repository` Folder

This folder contains Spring Data JPA repositories.

Repositories are responsible for database access.

Current files:

```text
RadarAlertRepository.java
RadarStationRepository.java
TelemetryReadingRepository.java
```

## What Repositories Do

Each repository extends `JpaRepository`.

That gives the backend built-in database methods such as:

- `findAll`
- `findById`
- `save`
- `deleteById`
- `count`

Spring Data JPA automatically implements these interfaces at runtime.

## `RadarStationRepository.java`

Handles database operations for `RadarStation`.

Custom methods:

```java
boolean existsByCodeIgnoreCase(String code);
Optional<RadarStation> findByCodeIgnoreCase(String code);
```

These help prevent duplicate radar codes and find radars by code.

## `TelemetryReadingRepository.java`

Handles database operations for `TelemetryReading`.

Custom method:

```java
List<TelemetryReading> findTop20ByOrderByRecordedAtDesc();
```

This returns the latest 20 telemetry readings.

## `RadarAlertRepository.java`

Handles database operations for `RadarAlert`.

Custom methods:

```java
List<RadarAlert> findByStatusOrderByCreatedAtDesc(AlertStatus status);
List<RadarAlert> findAllByOrderByCreatedAtDesc();
```

These make it easy to list alerts by status and show newest alerts first.

## Rule For This Folder

Repositories should only handle database access.

They should not contain HTTP code, request validation, or business decisions. Services should call repositories and decide what to do with the data.
