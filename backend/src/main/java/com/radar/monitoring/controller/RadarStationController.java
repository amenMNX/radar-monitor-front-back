package com.radar.monitoring.controller;

import com.radar.monitoring.dto.RadarStationRequest;
import com.radar.monitoring.dto.RadarStationResponse;
import com.radar.monitoring.dto.RadarStatusRequest;
import com.radar.monitoring.service.RadarStationService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/radars")
public class RadarStationController {

    private final RadarStationService radarStationService;

    public RadarStationController(RadarStationService radarStationService) {
        this.radarStationService = radarStationService;
    }

    @GetMapping
    public List<RadarStationResponse> findAll() {
        return radarStationService.findAll();
    }

    @GetMapping("/{id}")
    public RadarStationResponse findById(@PathVariable Long id) {
        return radarStationService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RadarStationResponse create(@Valid @RequestBody RadarStationRequest request) {
        return radarStationService.create(request);
    }

    @PutMapping("/{id}/status")
    public RadarStationResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody RadarStatusRequest request
    ) {
        return radarStationService.updateStatus(id, request.status());
    }
}
