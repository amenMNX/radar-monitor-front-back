package com.radar.monitoring.service;

import com.radar.monitoring.domain.AlertStatus;
import com.radar.monitoring.domain.RadarAlert;
import com.radar.monitoring.domain.RadarStation;
import com.radar.monitoring.dto.AlertRequest;
import com.radar.monitoring.dto.AlertResponse;
import com.radar.monitoring.repository.RadarAlertRepository;
import java.time.Instant;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RadarAlertService {

    private final RadarStationService radarStationService;
    private final RadarAlertRepository radarAlertRepository;

    public RadarAlertService(
            RadarStationService radarStationService,
            RadarAlertRepository radarAlertRepository
    ) {
        this.radarStationService = radarStationService;
        this.radarAlertRepository = radarAlertRepository;
    }

    @Transactional(readOnly = true)
    public List<AlertResponse> findAll(AlertStatus status) {
        List<RadarAlert> alerts = status == null
                ? radarAlertRepository.findAllByOrderByCreatedAtDesc()
                : radarAlertRepository.findByStatusOrderByCreatedAtDesc(status);

        return alerts.stream().map(this::toResponse).toList();
    }

    @Transactional
    public AlertResponse create(AlertRequest request) {
        RadarStation radar = radarStationService.findEntityById(request.radarId());

        RadarAlert alert = new RadarAlert();
        alert.setRadar(radar);
        alert.setSeverity(request.severity());
        alert.setStatus(AlertStatus.OPEN);
        alert.setMessage(request.message());
        alert.setCreatedAt(Instant.now());

        return toResponse(radarAlertRepository.save(alert));
    }

    @Transactional
    public AlertResponse acknowledge(Long id) {
        RadarAlert alert = radarAlertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert " + id + " was not found"));

        alert.setStatus(AlertStatus.ACKNOWLEDGED);
        return toResponse(alert);
    }

    private AlertResponse toResponse(RadarAlert alert) {
        RadarStation radar = alert.getRadar();
        return new AlertResponse(
                alert.getId(),
                radar.getId(),
                radar.getCode(),
                alert.getSeverity(),
                alert.getStatus(),
                alert.getMessage(),
                alert.getCreatedAt()
        );
    }
}
