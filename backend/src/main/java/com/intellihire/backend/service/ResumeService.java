package com.intellihire.backend.service;

import com.intellihire.backend.repository.ResumeRepository;
import com.intellihire.backend.repository.UserRepository;
import com.intellihire.model.Resume;
import com.intellihire.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    public Resume getResumeById(String id) {
        return resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
    }

    public void deleteResume(String id) {
        resumeRepository.deleteById(id);
    }

    public ResponseEntity<String> handleFileUpload(MultipartFile file, String email) {
    try {
        // ✅ Validate by file extension
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.toLowerCase().endsWith(".pdf")) {
            return ResponseEntity.badRequest().body("Only PDF files are allowed.");
        }

        // ✅ Validate by content type
        if (!file.getContentType().equalsIgnoreCase("application/pdf")) {
            return ResponseEntity.badRequest().body("File content type must be PDF.");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Save file to disk
        String uploadDir = "uploads/resumes/";
        Files.createDirectories(Paths.get(uploadDir));
        String filename = user.getId() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + filename);
        Files.write(filePath, file.getBytes());

        Resume resume = user.getResume();

        if (resume == null) {
            // If no resume exists, create one
            resume = Resume.builder()
                    .user(user)
                    .build();
        }

        // Update file fields
        resume.setFilename(file.getOriginalFilename());
        resume.setFileUrl(filePath.toString());
        resume.setOverallScore(0.0);
        resume.setReadability(0.0);
        resume.setSkillMatch(0.0);
        resume.setExperienceScore(0.0);

        user.setResume(resume); // Ensure bidirectional consistency

        // Save resume (cascades to user if needed)
        resumeRepository.save(resume);

        return ResponseEntity.ok("Resume uploaded successfully.");
    } catch (IOException e) {
        return ResponseEntity.status(500).body("Failed to upload resume.");
    }
}
}
