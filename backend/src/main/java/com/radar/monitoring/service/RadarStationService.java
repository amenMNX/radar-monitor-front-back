package com.radar.monitoring.service;

import com.radar.monitoring.domain.RadarStation;
import com.radar.monitoring.dto.RadarStationRequest;
import com.radar.monitoring.dto.RadarStationResponse;
import com.radar.monitoring.repository.RadarStationRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RadarStationService {

    private final RadarStationRepository radarStationRepository;

    public RadarStationService(RadarStationRepository radarStationRepository) {
        this.radarStationRepository = radarStationRepository;
    }

    @Transactional(readOnly = true)
    public List<RadarStationResponse> findAll() {
        return radarStationRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public RadarStation findEntityById(Long id) {
        return radarStationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Radar station " + id + " was not found"));
    }

    @Transactional(readOnly = true)
    public RadarStationResponse findById(Long id) {
        return toResponse(findEntityById(id));
    }

    @Transactional
    public RadarStationResponse create(RadarStationRequest request) {
        if (radarStationRepository.existsByCodeIgnoreCase(request.code())) {
            throw new IllegalArgumentException("Radar station code already exists: " + request.code());
        }

        RadarStation radar = new RadarStation();
        applyRequest(radar, request);
        return toResponse(radarStationRepository.save(radar));
    }

    @Transactional
    public RadarStationResponse updateStatus(Long id, com.radar.monitoring.domain.RadarStatus status) {
        RadarStation radar = findEntityById(id);
        radar.setStatus(status);
        return toResponse(radar);
    }

    RadarStationResponse toResponse(RadarStation radar) {
        return new RadarStationResponse(
                radar.getId(),
                radar.getCode(),
                radar.getName(),
                radar.getLocation(),
                radar.getStatus(),
                radar.getRangeKm()
        );
    }

    private void applyRequest(RadarStation radar, RadarStationRequest request) {
        radar.setCode(request.code());
        radar.setName(request.name());
        radar.setLocation(request.location());
        radar.setStatus(request.status());
        radar.setRangeKm(request.rangeKm());
    }
}
