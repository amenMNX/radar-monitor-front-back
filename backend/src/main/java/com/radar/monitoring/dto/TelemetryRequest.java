package com.radar.monitoring.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record TelemetryRequest(
        @NotNull Long radarId,
        @Min(0) @Max(100) int signalStrength,
        @Min(0) @Max(100) int cpuLoad,
        @Min(0) @Max(100) int temperatureCelsius
) {
}
