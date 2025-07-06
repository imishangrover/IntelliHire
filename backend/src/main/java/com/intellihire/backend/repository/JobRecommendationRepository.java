package com.intellihire.backend.repository;

import com.intellihire.model.JobRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRecommendationRepository extends JpaRepository<JobRecommendation, String> {
    @Query("SELECT jr FROM JobRecommendation jr WHERE jr.user.id = :userId")
    List<JobRecommendation> findByUserId(@Param("userId") String userId);
}