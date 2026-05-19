package com.radar.monitoring.service;

import com.radar.monitoring.domain.RadarStation;
import com.radar.monitoring.domain.TelemetryReading;
import com.radar.monitoring.dto.TelemetryRequest;
import com.radar.monitoring.dto.TelemetryResponse;
import com.radar.monitoring.repository.TelemetryReadingRepository;
import java.time.Instant;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TelemetryService {

    private final RadarStationService radarStationService;
    private final TelemetryReadingRepository telemetryReadingRepository;

    public TelemetryService(
            RadarStationService radarStationService,
            TelemetryReadingRepository telemetryReadingRepository
    ) {
        this.radarStationService = radarStationService;
        this.telemetryReadingRepository = telemetryReadingRepository;
    }

    @Transactional(readOnly = true)
    public List<TelemetryResponse> latest() {
        return telemetryReadingRepository.findTop20ByOrderByRecordedAtDesc().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public TelemetryResponse create(TelemetryRequest request) {
        RadarStation radar = radarStationService.findEntityById(request.radarId());

        TelemetryReading reading = new TelemetryReading();
        reading.setRadar(radar);
        reading.setRecordedAt(Instant.now());
        reading.setSignalStrength(request.signalStrength());
        reading.setCpuLoad(request.cpuLoad());
        reading.setTemperatureCelsius(request.temperatureCelsius());

        return toResponse(telemetryReadingRepository.save(reading));
    }

    private TelemetryResponse toResponse(TelemetryReading reading) {
        RadarStation radar = reading.getRadar();
        return new TelemetryResponse(
                reading.getId(),
                radar.getId(),
                radar.getCode(),
                reading.getRecordedAt(),
                reading.getSignalStrength(),
                reading.getCpuLoad(),
                reading.getTemperatureCelsius()
        );
    }
}
