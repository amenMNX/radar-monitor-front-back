package com.radar.monitoring.controller;

import com.radar.monitoring.domain.AlertStatus;
import com.radar.monitoring.dto.AlertRequest;
import com.radar.monitoring.dto.AlertResponse;
import com.radar.monitoring.service.RadarAlertService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/alerts")
public class RadarAlertController {

    private final RadarAlertService radarAlertService;

    public RadarAlertController(RadarAlertService radarAlertService) {
        this.radarAlertService = radarAlertService;
    }

    @GetMapping
    public List<AlertResponse> findAll(@RequestParam(required = false) AlertStatus status) {
        return radarAlertService.findAll(status);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AlertResponse create(@Valid @RequestBody AlertRequest request) {
        return radarAlertService.create(request);
    }

    @PatchMapping("/{id}/acknowledge")
    public AlertResponse acknowledge(@PathVariable Long id) {
        return radarAlertService.acknowledge(id);
    }
}
