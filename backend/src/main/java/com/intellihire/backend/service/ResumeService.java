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
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Save file to disk
            String uploadDir = "uploads/resumes/";
            Files.createDirectories(Paths.get(uploadDir));
            String filename = user.getId() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + filename);
            Files.write(filePath, file.getBytes());

            // Save to DB
            Resume resume = Resume.builder()
                    .filename(file.getOriginalFilename())
                    .fileUrl(filePath.toString())
                    .user(user)
                    .overallScore(0.0)
                    .readability(0.0)
                    .skillMatch(0.0)
                    .experienceScore(0.0)
                    .build();

            resumeRepository.save(resume);

            return ResponseEntity.ok("Resume uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload resume.");
        }
    }
}
