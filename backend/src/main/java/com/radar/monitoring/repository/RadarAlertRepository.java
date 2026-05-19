package com.radar.monitoring.repository;

import com.radar.monitoring.domain.AlertStatus;
import com.radar.monitoring.domain.RadarAlert;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RadarAlertRepository extends JpaRepository<RadarAlert, Long> {

    List<RadarAlert> findByStatusOrderByCreatedAtDesc(AlertStatus status);

    List<RadarAlert> findAllByOrderByCreatedAtDesc();
}
