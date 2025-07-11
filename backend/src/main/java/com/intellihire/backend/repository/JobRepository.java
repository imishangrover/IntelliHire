package com.intellihire.backend.repository;

import com.intellihire.model.Job;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    List<Job> findTop5ByOrderByIdDesc();
}