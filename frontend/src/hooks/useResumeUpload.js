import { useState, useCallback } from 'react';
import API from '../api/axios';

export function useResumeUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeScore, setResumeScore] = useState(null);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      return;
    }

    console.log('Uploading file:', file);
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await API.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Upload Response:', response.data);

      // ✅ Backend returns string like "Resume uploaded successfully."
      //alert(response.data); // show success message

      // Set resume file name only (no ID available)
      setResumeFile({
        name: file.name,
        id: response.data, // or leave undefined
      });

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Resume upload failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearResumeData = () => {
    setResumeFile(null);
    setResumeScore(null);
    setFeedback(null);
    setJobRecommendations([]);
  };

  return {
    resumeFile,
    resumeScore,
    jobRecommendations,
    feedback,
    isProcessing,
    handleFileUpload,
    clearResumeData,
  };
}
