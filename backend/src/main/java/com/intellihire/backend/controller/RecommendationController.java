package com.intellihire.backend.controller;

import com.intellihire.model.JobRecommendation;
import com.intellihire.backend.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping
    public List<JobRecommendation> getAllRecommendations() {
        return recommendationService.getAllRecommendations();
    }

    @GetMapping("/user/{userId}")
    public List<JobRecommendation> getRecommendationsByUser(@PathVariable String userId) {
        return recommendationService.getRecommendationsByUserId(userId);
    }

    @PostMapping
    public JobRecommendation saveRecommendation(@RequestBody JobRecommendation recommendation) {
        return recommendationService.saveRecommendation(recommendation);
    }

    @DeleteMapping("/{id}")
    public void deleteRecommendation(@PathVariable String id) {
        recommendationService.deleteRecommendation(id);
    }
}
