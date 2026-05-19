# `src/main/java` Folder

This folder contains the Java source code for the backend.

The code is organized by Java package. In this project, the main package path is:

```text
com.radar.monitoring
```

Spring Boot scans classes from the package where the main application class is located and its subpackages. Because `RadarMonitoringApplication` is inside `com.radar.monitoring`, Spring can automatically discover the controllers, services, repositories, and configuration classes inside the same package tree.

This folder is where the backend behavior is implemented.
