# `domain` Folder

This folder contains the core domain model of the backend.

Domain classes represent the main business objects in the radar monitoring system. These classes are also JPA entities, which means Spring Data JPA maps them to database tables.

Current files:

```text
AlertSeverity.java
AlertStatus.java
RadarAlert.java
RadarStation.java
RadarStatus.java
TelemetryReading.java
```

## `RadarStation.java`

Represents a radar station.

Important fields:

- `id`: database ID
- `code`: unique radar code, such as `RAD-NORTH`
- `name`: readable radar name
- `location`: where the radar is located
- `status`: current radar status
- `rangeKm`: radar range in kilometers

This entity is used by telemetry readings and alerts.

## `TelemetryReading.java`

Represents a telemetry reading from a radar station.

Important fields:

- `id`: database ID
- `radar`: the radar station this reading belongs to
- `recordedAt`: when the reading was recorded
- `signalStrength`: signal percentage from `0` to `100`
- `cpuLoad`: CPU usage percentage from `0` to `100`
- `temperatureCelsius`: radar temperature from `0` to `100`

This entity lets the backend store operational status over time.

## `RadarAlert.java`

Represents an alert connected to a radar station.

Important fields:

- `id`: database ID
- `radar`: the radar station linked to the alert
- `severity`: alert importance
- `status`: alert lifecycle status
- `message`: alert description
- `createdAt`: when the alert was created

## Enums

Enums define fixed allowed values.

`RadarStatus`:

```text
ONLINE
DEGRADED
OFFLINE
MAINTENANCE
```

`AlertSeverity`:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

`AlertStatus`:

```text
OPEN
ACKNOWLEDGED
RESOLVED
```

## Rule For This Folder

Domain classes should describe the data model.

They should not contain controller code, API formatting code, or complex request handling. Those responsibilities belong to other folders.
