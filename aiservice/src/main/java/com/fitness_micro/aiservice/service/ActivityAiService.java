package com.fitness_micro.aiservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness_micro.aiservice.model.Activity;
import com.fitness_micro.aiservice.model.Recommendation;
import com.fitness_micro.aiservice.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityAiService {

    private final GeminiService geminiService;
    private final RecommendationRepository recommendationRepository;

    public Recommendation generateRecommendation(Activity activity) {

        String prompt = createPrompt(activity);

        String aiResponse = geminiService.getAnswer(prompt);

        log.info("Response from AI is: {}", aiResponse);

        return processAiResponse(activity ,aiResponse);
    }

    private Recommendation processAiResponse(Activity activity , String  aiResponse){
        try {
            ObjectMapper mapper = new ObjectMapper();

            JsonNode rootNode = mapper.readTree(aiResponse);

            JsonNode textNode = rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");


            String jsonContent = textNode.asText()
                    .replaceAll("```json\\n","")
                    .replaceAll("\\n```","")
                    .trim();

//            log.info("Parsed Response from ai:{}",jsonContent);

            JsonNode analysisJson = mapper.readTree(jsonContent);
            JsonNode analysisNode = analysisJson.path("analysis");

            StringBuilder fullAnalysis = new StringBuilder();

            addAnalysisSection(fullAnalysis , analysisNode , "overall" ,"OverAll:");
            addAnalysisSection(fullAnalysis , analysisNode , "pace" ,"Pace:");
            addAnalysisSection(fullAnalysis , analysisNode , "heartRate" ,"Heart Rate:");
            addAnalysisSection(fullAnalysis , analysisNode , "caloriesBurned" ,"Calories Burned:");

            List<String> improvements = extractImprovements(analysisJson.path("improvements"));
            List<String> suggestions = extractSuggestions(analysisJson.path("suggestion"));

            List<String> safety = extractSafety(analysisJson.path("safety"));

            return Recommendation.builder()
                    .activityId(activity.getId())
                    .userId(activity.getUserId())
                    .safety(safety)
                    .activityType(activity.getType())
                    .improvements(improvements)
                    .suggestions(suggestions)
                    .Recommendation(fullAnalysis.toString().trim())
                    .createdAt(LocalDateTime.now())
                    .build();
        } catch (Exception e){
            e.printStackTrace();
            return createDefaultRecommendation(activity);
        }
    }

    private Recommendation createDefaultRecommendation(Activity activity) {

        return Recommendation.builder()
                .activityType(activity.getType())
                .activityId(activity.getId())
                .userId(activity.getUserId())
                .improvements(Collections.singletonList("Continue with your "))
                .Recommendation("Unable to generate detailed analysis")
                .suggestions(Collections.singletonList("Consider consulting"))
                .safety(Arrays.asList(
                        "Always warm up before exercise",
                        "Stay hydrated",
                        "Listen to your body"
                ))
                .createdAt(LocalDateTime.now())
                .build();
    }

    private List<String> extractSafety(JsonNode safetyNode) {

        List<String> safety = new ArrayList<>();

        if (safetyNode.isArray()){
            safetyNode.forEach(safe->{
                safety.add(safe.asText());
            });
        }

        return safety.isEmpty() ?
                Collections.singletonList("Follow general safety guidlines")
                :
                safety;

    }

    private List<String> extractSuggestions(JsonNode suggestionNode) {

        List<String> sugggestions = new ArrayList<>();

        if (suggestionNode.isArray()){
            suggestionNode.forEach(suggestion->{
                String workout = suggestionNode.path("workout").asText();
                String descriptions = suggestionNode.path("description").asText();

                sugggestions.add(String.format("%s: %s" , workout , descriptions));
            });
        }

        return sugggestions.isEmpty() ?
                Collections.singletonList("No Specific suggestions")
                :
                sugggestions;
    }

    private List<String> extractImprovements(JsonNode improvementsNode) {
    List<String> improvements = new ArrayList<>();

    if(improvementsNode.isArray()){
        improvementsNode.forEach(improvement->{
            String area = improvement.path("area").asText();
            String detail =improvement.path("recommendation").asText();
            improvements.add(String.format("%s: %s",area , detail));
        });
    }

        return improvements.isEmpty() ?
                Collections.singletonList("No specific improvements Provided")
                :
                improvements;
    }

    private void addAnalysisSection(StringBuilder fullAnalysis, JsonNode analysisNode, String key, String prefix) {
        if(!analysisNode.path(key).isMissingNode()){
            fullAnalysis.append(prefix)
                    .append(analysisNode.path(key).asText())
                    .append("\n\n");
        }
    }

    private String createPrompt(Activity activity) {

        return String.format("""
                Analyze this fitness activity and provide detailed recommendation in the following EXACT JSON format:
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