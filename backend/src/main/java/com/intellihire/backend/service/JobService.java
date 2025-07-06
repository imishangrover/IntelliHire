package com.intellihire.backend.service;

import com.intellihire.model.Job;
import com.intellihire.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(String id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(String id, Job updatedJob) {
        return jobRepository.findById(id).map(existingJob -> {
            existingJob.setTitle(updatedJob.getTitle());
            existingJob.setCompany(updatedJob.getCompany());
            existingJob.setLocation(updatedJob.getLocation());
            existingJob.setSalary(updatedJob.getSalary());
            existingJob.setType(updatedJob.getType());
            existingJob.setRequiredSkills(updatedJob.getRequiredSkills());
            return jobRepository.save(existingJob);
        }).orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public void deleteJob(String id) {
        jobRepository.deleteById(id);
    }
}
