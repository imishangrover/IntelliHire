import { useState, useCallback } from 'react';
import { mockResumeScore, mockFeedback, mockJobs } from '../services/mockData';

export function useResumeUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeScore, setResumeScore] = useState(null);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setIsProcessing(true);

      setTimeout(() => {
        setResumeScore(mockResumeScore);
        setJobRecommendations(mockJobs);
        setFeedback(mockFeedback);
        setIsProcessing(false);
      }, 3000);
    }
  }, []);

  return {
    resumeFile,
    resumeScore,
    jobRecommendations,
    feedback,
    isProcessing,
    handleFileUpload
  };
}
