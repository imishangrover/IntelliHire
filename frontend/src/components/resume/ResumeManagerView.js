import React from 'react';
import { Upload, Eye, Download } from 'lucide-react';
import API from '../../api/axios';

const ResumeManagerView = ({ resumeFile, handleFileUpload }) => {
  console.log("resumeFile: ", resumeFile);
  const resumeId = resumeFile?.id;

  const handleDownload = async () => {
    console.log("ResumeID: ", resumeId);
    if (!resumeId) return;

    try {
      const response = await API.get(`/resumes/download/${resumeId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      console.log("blob`", blob);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      console.log("link", link)
      link.href = url;
      link.download = resumeFile.name || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // ✅ Safe here
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download resume.');
    }
  };

  const handleView = async () => {
    if (!resumeId) return;

    try {
      const response = await API.get(`/resumes/view/${resumeId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank'); // ✅ DON'T revoke URL immediately
      // Do NOT call URL.revokeObjectURL here
    } catch (error) {
      console.error('View failed:', error);
      alert('Failed to open resume.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resume Manager</h2>

      {resumeFile ? (
        <div className="space-y-4">
          <p className="text-gray-600">
            Current Resume: <strong>{resumeFile.name}</strong>
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleView}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Eye className="w-4 h-4" /> View
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <label className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 cursor-pointer">
              <Upload className="w-4 h-4" />
              Reupload
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-600 mb-4">No resume uploaded</p>
          <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer">
            <Upload className="w-5 h-5" />
            Upload Resume (PDF)
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ResumeManagerView;
