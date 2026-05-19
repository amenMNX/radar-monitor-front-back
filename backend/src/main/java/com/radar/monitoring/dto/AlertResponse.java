package com.radar.monitoring.dto;

import com.radar.monitoring.domain.AlertSeverity;
import com.radar.monitoring.domain.AlertStatus;
import java.time.Instant;

public record AlertResponse(
        Long id,
        Long radarId,
        String radarCode,
        AlertSeverity severity,
        AlertStatus status,
        String message,
        Instant createdAt
) {
}
