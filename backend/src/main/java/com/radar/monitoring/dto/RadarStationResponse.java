package com.radar.monitoring.dto;

import com.radar.monitoring.domain.RadarStatus;

public record RadarStationResponse(
        Long id,
        String code,
        String name,
        String location,
        RadarStatus status,
        double rangeKm
) {
}
