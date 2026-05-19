package com.radar.monitoring.dto;

import com.radar.monitoring.domain.RadarStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record RadarStationRequest(
        @NotBlank String code,
        @NotBlank String name,
        @NotBlank String location,
        @NotNull RadarStatus status,
        @Positive double rangeKm
) {
}
