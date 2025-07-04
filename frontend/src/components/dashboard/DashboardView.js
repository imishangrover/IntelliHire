import React from 'react';
import { Award, FileText, Target, TrendingUp, Upload, Star} from 'lucide-react';
import logo from '../../assets/logo.png';

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

const JobCard = ({ job }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <p className="text-gray-600">{job.company}</p>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-gray-700">{(job.similarity * 100).toFixed(0)}% match</span>
        </div>
        <span className="text-sm text-gray-500">{job.posted}</span>
      </div>
    </div>
    
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill, idx) => (
          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
    
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-900">{job.salary}</p>
        <p className="text-xs text-gray-500">{job.type}</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Apply Now
      </button>
    </div>
  </div>
);

const DashboardView = ({ resumeFile, resumeScore, jobRecommendations, user, handleFileUpload }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="text-sm text-gray-500">Welcome back, {user.name}</div>
      </div>

      {!resumeFile ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
          <img src={logo} alt="IntelliHire" className="w-8 h-8" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Resume to Get Started</h3>
          <p className="text-gray-600 mb-6">
            Our AI will analyze your resume and provide personalized job recommendations
          </p>
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScoreCard title="Overall Score" score={resumeScore?.overall || 0} icon={Award} color="bg-blue-600" />
            <ScoreCard title="Readability" score={resumeScore?.readability || 0} icon={FileText} color="bg-green-600" />
            <ScoreCard title="Skill Match" score={resumeScore?.skillMatch || 0} icon={Target} color="bg-purple-600" />
            <ScoreCard title="Experience" score={resumeScore?.experience || 0} icon={TrendingUp} color="bg-orange-600" />
          </div>

          {jobRecommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Job Recommendations</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobRecommendations.slice(0, 2).map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardView;
