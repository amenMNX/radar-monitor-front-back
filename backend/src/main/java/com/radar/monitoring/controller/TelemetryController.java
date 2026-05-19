package com.radar.monitoring.controller;

import com.radar.monitoring.dto.TelemetryRequest;
import com.radar.monitoring.dto.TelemetryResponse;
import com.radar.monitoring.service.TelemetryService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/telemetry")
public class TelemetryController {

    private final TelemetryService telemetryService;

    public TelemetryController(TelemetryService telemetryService) {
        this.telemetryService = telemetryService;
    }

    @GetMapping("/latest")
    public List<TelemetryResponse> latest() {
        return telemetryService.latest();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TelemetryResponse create(@Valid @RequestBody TelemetryRequest request) {
        return telemetryService.create(request);
    }
}
