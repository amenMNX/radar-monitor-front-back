package com.radar.monitoring.repository;

import com.radar.monitoring.domain.TelemetryReading;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelemetryReadingRepository extends JpaRepository<TelemetryReading, Long> {

    List<TelemetryReading> findTop20ByOrderByRecordedAtDesc();
}
