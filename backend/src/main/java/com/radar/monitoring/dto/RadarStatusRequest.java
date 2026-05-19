package com.radar.monitoring.dto;

import com.radar.monitoring.domain.RadarStatus;
import jakarta.validation.constraints.NotNull;

public record RadarStatusRequest(@NotNull RadarStatus status) {
}
