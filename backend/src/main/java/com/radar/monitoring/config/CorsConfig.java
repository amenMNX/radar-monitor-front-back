package com.radar.monitoring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        // FIX: added port 4173 (vite preview / Docker) and 80 (nginx in container)
                        .allowedOrigins(
                                "http://localhost:5173",   // vite dev server
                                "http://localhost:3000",   // alternate dev
                                "http://localhost:4173",   // vite preview / Docker mapped port
                                "http://localhost:80",     // nginx inside container
                                "http://localhost"         // nginx without port
                        )
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
