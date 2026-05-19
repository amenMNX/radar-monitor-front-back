# `com/radar/monitoring` Test Package Folder

This folder contains tests for the main backend package.

Current test file:

```text
RadarMonitoringApplicationTests.java
```

## `RadarMonitoringApplicationTests.java`

This test checks that the Spring Boot application context loads.

That means Spring can:

- Start the application context
- Create configured beans
- Discover controllers, services, repositories, and configuration classes
- Load application configuration

It is a basic but useful first test because it catches many startup problems.

## Future Tests To Add

Useful next tests would include:

- `RadarStationController` API tests
- `TelemetryController` API tests
- `RadarAlertController` API tests
- Service tests for duplicate radar codes
- Service tests for missing radar IDs
- Repository tests for custom query methods
