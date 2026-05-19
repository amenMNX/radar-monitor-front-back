package com.radar.monitoring.dto;

import com.radar.monitoring.domain.AlertSeverity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AlertRequest(
        @NotNull Long radarId,
        @NotNull AlertSeverity severity,
        @NotBlank String message
) {
}
