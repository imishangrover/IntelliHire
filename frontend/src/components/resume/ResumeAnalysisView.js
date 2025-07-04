import React from 'react';
import { Upload, Award, FileText, Target, Check, AlertCircle } from 'lucide-react';

const ScoreCard = ({ title, score, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{score}/10</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color.replace('bg-', 'bg-opacity-100 bg-')}`}
        style={{ width: `${score * 10}%` }}
      />
    </div>
  </div>
);

const ResumeAnalysisView = ({ resumeFile, resumeScore, feedback, handleFileUpload }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resume Analysis</h2>

      {!resumeFile ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Resume Uploaded</h3>
          <p className="text-gray-600 mb-6">Upload your resume to get detailed AI analysis</p>
          <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Scores</h3>
            <div className="space-y-4">
              <ScoreCard title="Overall Score" score={resumeScore?.overall || 0} icon={Award} color="bg-blue-600" />
              <ScoreCard title="Readability" score={resumeScore?.readability || 0} icon={FileText} color="bg-green-600" />
              <ScoreCard title="Skill Match" score={resumeScore?.skillMatch || 0} icon={Target} color="bg-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Feedback</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Strengths
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {feedback?.strengths?.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Areas for Improvement
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {feedback?.improvements?.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>{imp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-700 mb-2">Missing Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {feedback?.missingSkills?.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysisView;
