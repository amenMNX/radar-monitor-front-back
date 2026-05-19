package com.radar.monitoring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public ApiResponse root() {
        return new ApiResponse("Radar Monitoring Backend API", "Available endpoints at /api");
    }

    static class ApiResponse {
        public String message;
        public String documentation;

        ApiResponse(String message, String documentation) {
            this.message = message;
            this.documentation = documentation;
        }
    }
}
