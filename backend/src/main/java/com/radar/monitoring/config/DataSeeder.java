package com.radar.monitoring.config;

import com.radar.monitoring.domain.AlertSeverity;
import com.radar.monitoring.domain.AlertStatus;
import com.radar.monitoring.domain.RadarAlert;
import com.radar.monitoring.domain.RadarStation;
import com.radar.monitoring.domain.RadarStatus;
import com.radar.monitoring.domain.TelemetryReading;
import com.radar.monitoring.repository.RadarAlertRepository;
import com.radar.monitoring.repository.RadarStationRepository;
import com.radar.monitoring.repository.TelemetryReadingRepository;
import java.time.Instant;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDemoData(
            RadarStationRepository radarStationRepository,
            TelemetryReadingRepository telemetryReadingRepository,
            RadarAlertRepository radarAlertRepository
    ) {
        return args -> {
            if (radarStationRepository.count() > 0) {
                return;
            }

            RadarStation north = radar("RAD-NORTH", "North Ridge Radar", "North sector", RadarStatus.ONLINE, 240);
            RadarStation coast = radar("RAD-COAST", "Coastal Radar", "Coastal perimeter", RadarStatus.DEGRADED, 180);
            RadarStation desert = radar("RAD-DESERT", "Desert Line Radar", "South-east sector", RadarStatus.MAINTENANCE, 210);

            radarStationRepository.save(north);
            radarStationRepository.save(coast);
            radarStationRepository.save(desert);

            telemetryReadingRepository.save(reading(north, 94, 32, 43));
            telemetryReadingRepository.save(reading(coast, 68, 74, 61));
            telemetryReadingRepository.save(reading(desert, 0, 12, 28));

            radarAlertRepository.save(alert(coast, AlertSeverity.HIGH, "Signal strength dropped below operational threshold"));
            radarAlertRepository.save(alert(desert, AlertSeverity.MEDIUM, "Scheduled maintenance window is active"));
        };
    }

    private RadarStation radar(String code, String name, String location, RadarStatus status, double rangeKm) {
        RadarStation radar = new RadarStation();
        radar.setCode(code);
        radar.setName(name);
        radar.setLocation(location);
        radar.setStatus(status);
        radar.setRangeKm(rangeKm);
        return radar;
    }

    private TelemetryReading reading(
            RadarStation radar,
            int signalStrength,
            int cpuLoad,
            int temperatureCelsius
    ) {
        TelemetryReading reading = new TelemetryReading();
        reading.setRadar(radar);
        reading.setRecordedAt(Instant.now());
        reading.setSignalStrength(signalStrength);
        reading.setCpuLoad(cpuLoad);
        reading.setTemperatureCelsius(temperatureCelsius);
        return reading;
    }

    private RadarAlert alert(RadarStation radar, AlertSeverity severity, String message) {
        RadarAlert alert = new RadarAlert();
        alert.setRadar(radar);
        alert.setSeverity(severity);
        alert.setStatus(AlertStatus.OPEN);
        alert.setMessage(message);
        alert.setCreatedAt(Instant.now());
        return alert;
    }
}
