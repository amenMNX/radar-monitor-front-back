# Radar Monitoring Backend

Spring Boot REST API for the radar monitoring frontend.

## Requirements

- Java 21
- Maven 3.6.3 or newer

## Run

```powershell
mvn spring-boot:run
```

The API runs at:

```text
http://localhost:8080
```

## Useful Endpoints

```text
GET    /api/health
GET    /api/radars
GET    /api/radars/{id}
POST   /api/radars
PUT    /api/radars/{id}/status
GET    /api/telemetry/latest
POST   /api/telemetry
GET    /api/alerts
GET    /api/alerts?status=OPEN
POST   /api/alerts
PATCH  /api/alerts/{id}/acknowledge
```

## Example Requests

Create a radar station:

```json
{
  "code": "RAD-WEST",
  "name": "Western Radar",
  "location": "West sector",
  "status": "ONLINE",
  "rangeKm": 190
}
```

Create telemetry:

```json
{
  "radarId": 1,
  "signalStrength": 91,
  "cpuLoad": 45,
  "temperatureCelsius": 48
}
```

Create an alert:

```json
{
  "radarId": 2,
  "severity": "HIGH",
  "message": "Signal is unstable"
}
```

The H2 console is available at:

```text
http://localhost:8080/h2-console
```

Use JDBC URL:

```text
jdbc:h2:mem:radar_monitoring
```
