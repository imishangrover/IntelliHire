-- Sample Users
INSERT INTO users (id, name, email, password, role)
VALUES 
  ('u1', 'John Doe', 'john@example.com', '$2a$12$YfBLZ38RkQRauOXaQTX2bOcLmKSPMvD.u/4UsSBuEXHbvcntJY1n2', 'USER'),
  ('u2', 'Admin User', 'admin@example.com', '$2a$12$YfBLZ38RkQRauOXaQTX2bOcLmKSPMvD.u/4UsSBuEXHbvcntJY1n2', 'ADMIN');

-- Sample Jobs
INSERT INTO jobs (id, title, company, location, salary, type)
VALUES 
  ('j1', 'Backend Developer', 'TechCorp', 'Bangalore', '12 LPA', 'Full-time'),
  ('j2', 'Frontend Developer', 'WebLabs', 'Hyderabad', '10 LPA', 'Full-time');

-- Required skills (element collection)
INSERT INTO job_required_skills (job_id, required_skills)
VALUES 
  ('j1', 'Java'), ('j1', 'Spring Boot'), ('j1', 'PostgreSQL'),
  ('j2', 'React'), ('j2', 'CSS'), ('j2', 'JavaScript');

-- Sample Resume
INSERT INTO resumes (id, filename, file_url, overall_score, readability, skill_match, experience_score, user_id)
VALUES 
  ('r1', 'resume_john.pdf', '/uploads/resume_john.pdf', 85.5, 90.0, 80.0, 86.0, 'u1');

-- Job Recommendation
INSERT INTO recommendations (id, job_id, user_id, similarity_score, notes)
VALUES 
  ('rec1', 'j1', 'u1', 0.92, 'Strong skill match');
