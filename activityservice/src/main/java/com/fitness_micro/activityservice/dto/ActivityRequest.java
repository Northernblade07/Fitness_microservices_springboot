package com.fitness_micro.activityservice.dto;

import com.fitness_micro.activityservice.model.ActivityType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;


@Data
public class ActivityRequest {

    private String userId;
    private Integer duration;
    private ActivityType type;
    private Integer caloriesBurned;
    private LocalDateTime startTime;
    private Map<String , Object> additionalMetrics;
}
