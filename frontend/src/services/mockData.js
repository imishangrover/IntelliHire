export const mockResumeScore = {
  overall: 8.5,
  readability: 9.0,
  skillMatch: 8.2,
  experience: 8.8,
  keywords: 7.9
};

export const mockFeedback = {
  strengths: [
    'Strong technical skill set with modern frameworks',
    'Good project experience diversity',
    'Clear and concise formatting'
  ],
  improvements: [
    'Add more quantifiable achievements',
    'Include specific metrics for project impacts',
    'Consider adding relevant certifications'
  ],
  missingSkills: ['Docker', 'Kubernetes', 'GraphQL', 'Testing frameworks']
};

export const mockJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    similarity: 0.92,
    salary: '$120K - $180K',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    type: 'Full-time',
    posted: '2 days ago'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    similarity: 0.87,
    salary: '$90K - $130K',
    skills: ['JavaScript', 'React', 'MongoDB', 'Express'],
    type: 'Full-time',
    posted: '1 week ago'
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Design Studio',
    location: 'New York, NY',
    similarity: 0.84,
    salary: '$85K - $110K',
    skills: ['React', 'CSS', 'TypeScript', 'Figma'],
    type: 'Full-time',
    posted: '3 days ago'
  }
];
