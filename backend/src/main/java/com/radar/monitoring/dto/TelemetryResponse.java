package com.radar.monitoring.dto;

import java.time.Instant;

public record TelemetryResponse(
        Long id,
        Long radarId,
        String radarCode,
        Instant recordedAt,
        int signalStrength,
        int cpuLoad,
        int temperatureCelsius
) {
}
