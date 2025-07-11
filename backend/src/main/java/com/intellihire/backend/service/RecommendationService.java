package com.intellihire.backend.service;

import com.intellihire.model.Job;
import com.intellihire.model.JobRecommendation;
import com.intellihire.backend.repository.JobRepository;
import com.intellihire.backend.repository.JobRecommendationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecommendationService {

    @Autowired
    private JobRecommendationRepository recommendationRepository;

    @Autowired
    private JobRepository jobRepository;

    public List<JobRecommendation> getAllRecommendations() {
        return recommendationRepository.findAll();
    }

    public Optional<JobRecommendation> getRecommendationById(String id) {
        return recommendationRepository.findById(id);
    }

    public List<JobRecommendation> getRecommendationsByUserId(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public JobRecommendation saveRecommendation(JobRecommendation recommendation) {
        return recommendationRepository.save(recommendation);
    }

    public void deleteRecommendation(String id) {
        recommendationRepository.deleteById(id);
    }

    public List<Job> getRecommendedJobs(String email) {
        // TODO: Connect with AI
        // For now: return top 5 jobs or random subset
        return jobRepository.findTop5ByOrderByIdDesc();
    }
}
