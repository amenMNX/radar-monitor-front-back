package com.radar.monitoring.repository;

import com.radar.monitoring.domain.RadarStation;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RadarStationRepository extends JpaRepository<RadarStation, Long> {

    boolean existsByCodeIgnoreCase(String code);

    Optional<RadarStation> findByCodeIgnoreCase(String code);
}
