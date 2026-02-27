package com.fitness_micro.aiservice.service;

import com.fitness_micro.aiservice.model.Activity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityAiService {

    private final GeminiService geminiService;

    public String generateRecommendation(Activity activity) {

        String prompt = createPrompt(activity);

        String aiResponse = geminiService.getAnswer(prompt);

        log.info("Response from AI is: {}", aiResponse);

        return aiResponse; // ✅ MUST return
    }

    private String createPrompt(Activity activity) {

        return String.format("""
                Analyze this fitness activity and provide detailed recommendation 
                in the following EXACT JSON format:

                {
                  "analysis": {
                    "overall": "Overall analysis here",
                    "pace": "Pace analysis here",
                    "heartRate": "Heart rate analysis here",
                    "caloriesBurned": "Calories analysis here"
                  },
                  "improvement": [
                    {
                      "area": "Area name",
                      "recommendation": "Detailed recommendation"
                    }
                  ],
                  "suggestion": [
                    {
                      "workout": "Workout name",
                      "description": "Detailed workout description"
                    }
                  ],
                  "safety": [
                    "Safety point 1",
                    "Safety point 2"
                  ]
                }

                Analyze this activity:

                Activity Type: %s
                Duration: %d minutes
                Calories Burned: %d
                Additional Metrics: %s

                Provide detailed analysis focusing on performance, improvements,
                next workout suggestions, and safety guidelines.

                IMPORTANT:
                - Return ONLY valid JSON
                - Do NOT add markdown
                - Do NOT add explanations
                """,
                activity.getType(),
                activity.getDuration(),
                activity.getCaloriesBurned(),
                activity.getAdditionalMetrics()
        );
    }
}