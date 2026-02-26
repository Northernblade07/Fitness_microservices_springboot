package com.fitness_micro.activityservice.service;

import com.fitness_micro.activityservice.dto.ActivityRequest;
import com.fitness_micro.activityservice.dto.ActivityResponse;
import com.fitness_micro.activityservice.model.Activity;
import com.fitness_micro.activityservice.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final UserValidationService userValidationService;

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    public ActivityResponse trackActivity(ActivityRequest request){

        boolean isValidUser = userValidationService.validateUser(request.getUserId());
        if(!isValidUser){
            throw new RuntimeException(("Invalid user"));
        }

        Activity activity = Activity.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .duration(request.getDuration())
                .additionalMetrics(request.getAdditionalMetrics())
                .build();

        Activity savedActivity = activityRepository.save(activity);

//        publish to rabbitmq for ai processing

        try{
            rabbitTemplate.convertAndSend(exchange , routingKey, savedActivity);
        } catch (Exception e) {
            log.error("Failed to publish activity event", e);
        }
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


    public List<ActivityResponse> getUserActivity(String userId) {
       List<Activity> activities =  activityRepository.findByUserId(userId);

       return activities.stream().map(this::maptoResponse).collect(Collectors.toList());
    }

    public ActivityResponse getActivityBYId(String id){

        Activity activity = activityRepository.findById(id).orElseThrow(()->new RuntimeException("no activity was found with id"+id));

        return maptoResponse(activity);
    }
}