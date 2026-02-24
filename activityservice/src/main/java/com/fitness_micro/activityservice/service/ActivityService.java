package com.fitness_micro.activityservice.service;

import com.fitness_micro.activityservice.dto.ActivityRequest;
import com.fitness_micro.activityservice.dto.ActivityResponse;
import com.fitness_micro.activityservice.model.Activity;
import com.fitness_micro.activityservice.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    public ActivityResponse trackActivity(ActivityRequest request){
        Activity activity = Activity.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .duration(request.getDuration())
                .additionalMetrics(request.getAdditionalMetrics())
                .build();

        Activity savedActivity = activityRepository.save(activity);
        return  maptoResponse(savedActivity);
    }

    private ActivityResponse maptoResponse(Activity activity){
        ActivityResponse activityResponse = new ActivityResponse();

        activityResponse.setId(activity.getId());
        activityResponse.setUserId(activity.getUserId());
        activityResponse.setType(activity.getType());
        activityResponse.setCaloriesBurned(activity.getCaloriesBurned());
        activityResponse.setDuration(activity.getDuration());
        activityResponse.setCreatedAt(activity.getCreatedAt());
        activityResponse.setUpdatedAt(activity.getUpdatedAt());
        activityResponse.setAdditionalMetrics(activity.getAdditionalMetrics());
        activityResponse.setStartTime(activity.getStartTime());

        return activityResponse;
    }
}