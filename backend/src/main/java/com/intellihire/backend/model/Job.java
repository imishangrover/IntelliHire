package com.intellihire.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String company;
    private String location;
    private String salary;
    private String type; // full-time, part-time, etc.

    @ElementCollection
    private List<String> requiredSkills;
}