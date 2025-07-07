import React from 'react';
import { Upload, Eye, Download } from 'lucide-react';

const ResumeManagerView = ({ resumeFile, handleFileUpload }) => {
  const handleDownload = () => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resume Manager</h2>

      {resumeFile ? (
        <div className="space-y-4">
          <p className="text-gray-600">Current Resume: <strong>{resumeFile.name}</strong></p>
          <div className="flex gap-4">
            <button
              onClick={() => window.open(URL.createObjectURL(resumeFile), '_blank')}
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
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      )}
    </div>
  );
};

export default ResumeManagerView;
